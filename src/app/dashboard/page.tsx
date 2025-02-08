"use client";
import Sidebar from "@/app/dashboard/Sidebar";
import Header from "./Header";

export default function Dashboard(){
    return(
        <div className="mx-[100px]">
            <Header />
            <Sidebar />
        </div>
    )
};

