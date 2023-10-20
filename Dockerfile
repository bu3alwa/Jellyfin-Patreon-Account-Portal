ARG NODE_VERSION
FROM node:${NODE_VERSION}-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat curl

COPY pnpm-lock.yaml* ./
COPY package.json ./
RUN curl -L https://unpkg.com/@pnpm/self-installer | node

RUN pnpm i --frozen-lockfile; 

FROM deps AS builder
WORKDIR /app

COPY . .
COPY --from=deps /app/node_modules ./node_modules

ENV DOCKER 'true'
RUN mkdir /config 
RUN pnpm run db:prepare

# Don't validate env when building
ENV SKIP_ENV_VALIDATION 1

RUN npm run build

FROM node:${NODE_VERSION}-alpine AS runner
WORKDIR /app

ENV NEXT_TELEMETRY_DISABLED 1
ENV NODE_ENV production
ENV DOCKER 'true'

EXPOSE 3000

COPY --from=builder  /app/.next/standalone ./
COPY --from=builder /config/ /config/

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]