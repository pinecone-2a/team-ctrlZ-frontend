"use client";
import Sidebar from "@/app/_components/sidebar";
import Header from "./Header";
import HomePageDefault from "../homepage/page";
export default function Dashboard(){
    return(
        <div className="mx-[100px]">
            <Header />
    
            <HomePageDefault/>

        </div>
    )
};

