ARG NODE_VERSION
FROM node:${NODE_VERSION}-alpine AS deps
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

WORKDIR /app

RUN apk add --no-cache libc6-compat curl

COPY pnpm-lock.yaml* ./
COPY package.json ./
RUN curl -L https://unpkg.com/@pnpm/self-installer | node

RUN echo 'node-linker=hoisted' > .npmrc
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm i --frozen-lockfile; 

FROM deps AS builder
WORKDIR /app

COPY . .
RUN echo 'node-linker=hoisted' > .npmrc
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

#COPY --from=builder  /app/.next/standalone ./
COPY --from=builder  /app/ ./
COPY --from=builder /config/ /config/

ENV PORT 3000
# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# Some bug with nextjs for now use next start
#CMD ["node", "server.js"]
CMD ["npx", "next", "start"]