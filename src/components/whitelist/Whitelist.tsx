import Spacer from "../ui/misc/Spacer";
import WhitelistCreate from "./WhitelistCreate";
import WhitelistItems from "./WhitelistItems";

export default function Whitelist() {
  return (
    <section className="flex flex-col gap-2">
      <h2>Whitelist</h2>
      <WhitelistCreate />
      <Spacer size={1} />
      <WhitelistItems />
    </section>
  );
}
