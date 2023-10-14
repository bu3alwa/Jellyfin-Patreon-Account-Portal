import { getServerAuthSession } from "~/server/auth/auth";

export default async function Subscribers() {
  const session = await getServerAuthSession();
  const campaigns =
    session &&
    (await fetch(
      "https://www.patreon.com/api/oauth2/api/current_user/campaigns",
      {
        headers: {
          Authorization: "Bearer " + session.accessToken,
        },
      },
    ));

  return (
    <>
      {JSON.stringify(campaigns?.json())}
      <select>
        <option>option 1</option>
      </select>
    </>
  );
}
