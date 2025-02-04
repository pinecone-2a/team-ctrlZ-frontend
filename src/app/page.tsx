"use client";

import Image from "next/image";
import Sign from "./_components/Sign-up";
import Login from "./_components/Login";
import CreateProfile from "./CreateProfile";
export default function Home() {
  return (
    <div>
      <Sign />
      <Login />
      <CreateProfile />
    </div>
  );
}
