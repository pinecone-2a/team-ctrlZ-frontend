"use client";
import HomePage from "@/app/_components/HomePage";
import Header from "../_components/header";

export default function HomePageDefault() {
  return (
    <div className="flex">
      <Header />
      <HomePage />
    </div>
  );
}
