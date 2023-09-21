"use client";

import { useState } from "react";
import Input from "../ui/inputs/Input";
import { AiOutlineDelete, AiOutlinePlus } from "react-icons/ai";
import IconButton from "../ui/buttons/IconButton";
import Spacer from "../ui/misc/Spacer";

const Whitelist = () => {
  const [addUser, setAddUser] = useState("");
  return (
    <section className="flex flex-col gap-2">
      <h2>Whitelist</h2>
      <span className="inline-flex gap-2">
        <Input value={addUser} onChange={(e) => setAddUser(e)} />
        <IconButton>
          <AiOutlinePlus />
        </IconButton>
      </span>
      <Spacer size={1} />
      <span className="inline-flex justify-between gap-2">
        <span>username</span>
        <IconButton colorStyle="red">
          <AiOutlineDelete />
        </IconButton>
      </span>
    </section>
  );
};
export default Whitelist;
