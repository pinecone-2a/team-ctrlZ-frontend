"use client";
import Sidebar from "@/app/_components/sidebar";
import HomePage from "../home/HomePage";
import Header from "../Home/header";

export default function Dashboard(){
    return(
        <div >
            <Header/>
            <div>
                <HomePage /> 
            </div>
        </div>
    )
};
