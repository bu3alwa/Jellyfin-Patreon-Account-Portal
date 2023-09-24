import { api } from "~/utils/server";
import IconButton from "../ui/buttons/IconButton";
import { AiOutlineDelete } from "react-icons/ai";

export default async function WhitelistItems() {
  const list = await api.whitelist.getAll.query();

  return (
    <>
      {list?.map((item) => (
        <form
          action={async () => {
            "use server";
            await api.whitelist.deleteById.mutate({
              id: item.id,
            });
            api.whitelist.getAll.revalidate()
          }}
          className="inline-flex justify-between gap-2"
        >
          <span>{item.username}</span>
          <IconButton type="submit" colorStyle="red">
            <AiOutlineDelete />
          </IconButton>
        </form>
      ))}
</>
  )
}