import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart } from 'lucide-react';

export default function FirstPage() {
    return (
        <div className="h-screen flex flex-col">
            <header>
                <div className="w-full pt-4 h-16">
                    <div>
                        <Link href={"/login"}>
                            <div className="mx-auto flex justify-center items-center">
                                <img className="w-[260px] h-auto absolute -top-[70px]" src="head.webp"/>
                            </div>
                        </Link>
                    </div>
                </div>
            </header>
            <Card className="w-[200px] h-[180px] rounded-3xl duration-300 top-[100px] left-6 transform absolute rotate-[5deg] hover:rotate-[-5deg]">
    <CardContent>
        <img className="w-[60px] h-[60px] object-center object-cover rounded-full mt-3 mx-auto" src="buyka.jpeg"/>   
        <p className="font-[600] mt-3 w-[150px] text-[12px] flex justify-center text-center">Buyka is building new platform for artists </p>
        <div className="flex justify-center items-center mt-2 gap-1 text-sm ">
            <Heart className="w-[20px] h-[20px]"/>
            3,213 supporters
        </div>
    </CardContent>
</Card>
<Card className="w-[200px] h-[180px] rounded-3xl duration-300 absolute top-[285px] left-10 transform rotate-[-5deg] hover:rotate-[0deg]">
    <CardContent>
        <img className="w-[60px] h-[60px] object-center object-cover rounded-full mt-3 mx-auto" src="chingis.jpeg"/>   
        <p className="font-[600] mt-3 w-[150px] text-[12px] flex justify-center text-center">Chingis is built creating youtube videos for podcasting</p>
        <div className="flex justify-center items-center mt-2 gap-1 text-sm ">
            <Heart className="w-[20px] h-[20px]"/>
            3,001 supporters
        </div>
    </CardContent>
</Card>
<Card className="w-[200px] h-[180px] rounded-3xl duration-300 absolute top-[500px] transform rotate-[5deg] hover:rotate-[-5deg]">
    <CardContent>
        <img className="w-[60px] h-[60px] object-center object-cover rounded-full mt-3 mx-auto" src="solongo.jpg"/>   
        <p className="font-[600] mt-3 w-[150px] text-[12px] flex justify-center text-center">Solongo is dinky little podcast</p>
        <div className="flex justify-center items-center mt-2 gap-1 text-sm ">
            <Heart className="w-[20px] h-[20px]"/>
            6,432 supporters
        </div>
    </CardContent>
</Card>
<Card className="w-[200px] h-[180px] rounded-3xl duration-300 absolute top-[200px] right-4 transform rotate-[5deg] hover:rotate-[-5deg]">
    <CardContent>
        <img className="w-[60px] h-[60px] object-center object-cover rounded-full mt-3 mx-auto" src="amaraa.jpeg"/>   
        <p className="font-[600] mt-3 w-[150px] text-[12px] flex justify-center text-center">Amaraa is creating wildcamp videos</p>
        <div className="flex justify-center items-center mt-2 gap-1 text-sm ">
            <Heart className="w-[20px] h-[20px]"/>
            3,232 supporters
        </div>
    </CardContent>
</Card>
<Card className="w-[200px] h-[180px] rounded-3xl duration-300 absolute top-[430px] right-5 transform rotate-[-10deg] hover:rotate-[5deg]">
    <CardContent>
        <img className="w-[60px] h-[60px] object-center object-cover rounded-full mt-3 mx-auto" src="amga.jpg"/>   
        <p className="font-[600] mt-3 w-[150px] text-[12px] flex justify-center text-center">Amga is helping people have better conversations about politics</p>
        <div className="flex justify-center items-center mt-2 gap-1 text-sm ">
            <Heart className="w-[20px] h-[20px]"/>
            9,332 supporters
        </div>
    </CardContent>
</Card>
            <main className="flex-grow">
                <h1 className="flex justify-center items-center text-center text-[#09090B] mt-20 gap-3">
                    <span className="text-green-700 text-[32px]">★★★★★</span>
                    <p className="text-lg">Loved by 1,000+ creators</p>
                </h1>
                <div className="flex items-center text-center mt-10 gap-3 flex-col w-[650px] mx-auto">
                    <p className="font-extrabold text-6xl">Fund your creative work</p>
                    <h3 className="text-2xl font-[200]">Accept support. Start a membership. Set up a shop. It’s easier than you think.</h3>
                    
                    <div className="flex justify-center gap-4 mt-10">
                        <Link href={"/login"}> <Button className="w-[200px] h-[60px] rounded-full text-2xl font-extrabold bg-yellow-400 hover:bg-yellow-300 text-black">Log in</Button> </Link>
                        <Link href={"signup"}>    <Button className="w-[200px] h-[60px] rounded-full text-2xl font-extrabold">Sign up</Button></Link>
                      
                    </div>

                    <p className="text-md mt-4">It’s free and takes less than a minute!</p>
                </div>
            </main>
            <div className="bg-gray-500 w-[85%] h-[1px] mx-auto"></div>
            <footer className="w-[95%] mx-auto h-[85px] mt-auto flex items-center justify-between px-4">
    <div className="flex flex-col items-start">
        <div className="text-xl font-bold">Pinecone2A</div>
        <p className="text-gray-500 font-bold">Team ctrlZ</p>
    </div>
    <span className="text-xl opacity-60 text-center ">© Buy Me a Coffee</span>
</footer>

        </div>
    )
}
