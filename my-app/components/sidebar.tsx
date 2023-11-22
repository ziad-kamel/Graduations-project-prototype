"use client";

import { cn } from "@/lib/utils";
import { Code, ImageIcon, LayoutDashboard, MessageSquare, Music, Settings, VideoIcon } from "lucide-react";
 
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link"
import { usePathname } from "next/navigation";
const monserat = Montserrat({weight: "600", subsets: ["latin"]});

const routes = [
        {
            label: "Dashboard",
            icon: LayoutDashboard,
            href: "/dashboard",
            color: "text-sky-500" // change that color depends on Ziad's opinion (color of the icons in the sidebar)
        },
        {
            label: "Conversation",
            icon: MessageSquare,
            href: "/conversation",
            color: "text-violet-500" // change that color depends on Ziad's opinion (color of the icons in the sidebar)
        },

        {
            label: "Image Generation",
            icon: ImageIcon,
            href: "/image",
            color: "text-pink-700" // change that color depends on Ziad's opinion (color of the icons in the sidebar)
        },
        {
            label: "Video Generation",
            icon: VideoIcon,
            href: "/video",
            color: "text-orange-700" // change that color depends on Ziad's opinion (color of the icons in the sidebar)
        },
        {
            label: "Audio Generation",
            icon: Music,
            href: "/music",
            color: "text-emerald-500" // change that color depends on Ziad's opinion (color of the icons in the sidebar)
        },
        {
            label: "Code Generation",
            icon: Code,
            href: "/code",
            color: "text-green-700" // change that color depends on Ziad's opinion (color of the icons in the sidebar)
        },
        {
            label: "Settings",
            icon: Settings,
            href: "/settings",
             
        }
];

const Sidebar =() =>{
    const pathname = usePathname()
    return (
        <div className=" py-4 flex flex-col h-full bg-[#000000] text-white">
        <div className="px-3 py-2 flex-1">
            <Link href="/dashboard" className="flex items-center pl-3 mb-14">
            <div className="relative h-8 w-8 mr-4">
                <Image 
                fill
                alt="Logo"
                src="/logo.png"
                />
            </div>
            <h1 className={ cn("text-2xl fonts-bold", monserat.className)}>
                Uchiha
            </h1>
            </Link>
                <div className="space-y-1">
                 {routes.map((route) =>(
                        <Link
                            href={route.href}
                            key={route.href}
                            className={cn("text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-white/10 rounded-lg transition",
                            pathname === route.href ? "text-white bg-white/10" : "text-zinc-400")} // it's highlited and active
                        >
                            <div className="flex items-center flex-1">
                                <route.icon className={cn("h-5 w-5 mr-3", route.color)} />
                                {route.label}
                            </div>
                        
                        </Link>
                 ))}
                </div>
        </div>   
        </div>
        
    )
}
export default Sidebar;