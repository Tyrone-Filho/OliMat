"use client";
import Image from "next/image";
import perfil from "@/app/perfil.png"

export default function Header({ onContinuar }: { onContinuar: () => void }) {
     return (
          <header className="flex flex-col w-full h-fit items-end sticky top-0 z-10 foreground">
               <button className=" pr-2 pt-2 cursor-pointer" onClick={onContinuar}>
                    {/* add router push para perfil em users/[user]/Perfil.tsx */}
                    <Image width={512} loading="eager" height={512} alt="foto" src={perfil} className="w-12! h-12! rounded-full object-cover border-4 border-[#171717] bg-white" />
               </button>
          </header>
     )
}
export function HeaderNoVoid() {
     return (
          <header className="flex flex-col w-full h-fit items-end foreground">
               <button className=" pr-2 pt-2 cursor-pointer">
                    {/* add router push para perfil em users/[user]/Perfil.tsx */}
                    <Image width={512} loading="eager" height={512} alt="foto" src={perfil} className="w-12! h-12! rounded-full object-cover border-4 border-[#171717] bg-white" />
               </button>
          </header>
     )
}
