"use client";
import Login from "./_components/Login";
import CreateProfile from "./CreateProfile";

import Image from "next/image";

export default function Home() {
  return (
    <div>
      <Login />
      <CreateProfile />
    </div>
  );
}
