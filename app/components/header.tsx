"use client";
import Image from "next/image";
import perfil from "@/app/perfil.png"
import { useState } from "react";
import Link from "next/link";
export function HeadePerfilTsx({ user }: { user: string }) {
     return (
          <header className="flex flex-col w-full h-fit items-start bg-[#c8d1d9] rounded-b-4xl pb-32 relative">
               <button className=" pr-2 pt-2 cursor-pointer pl-2">
                    <Link href={`/users/${user}`}>
                         <i className="fa-solid fa-arrow-left text-2xl text-black" />
                    </Link>
                    <Image width={512} loading="eager" height={512} alt="foto" src={perfil} className="w-30! h-30! absolute left-6 -bottom-14 rounded-full object-cover bg-white" />
               </button>
          </header>
     )
}
export default function Header({ user }: { user: string }) {
     const [aberto, setAberto] = useState(false);
     //Colocar link para membros
     //Colocar Link para questoes
     return (
          <header className="flex flex-row w-full h-fit justify-between rounded-b-4xl pb-4">
               <div className="relative pt-1">
                    <button
                         onClick={() => setAberto(!aberto)}
                         className="w-10 h-10 flex flex-col justify-center cursor-pointer
                         items-center gap-1.5"
                         aria-label="Abrir menu"
                         aria-expanded={aberto}
                    >
                         <span className={`w-7 h-0.5 bg-black transition-all duration-300
                              ${aberto ? "translate-y-2 rotate-45" : ""}`} />

                         <span className={`w-7 h-0.5 bg-black transition-all duration-300
                              ${aberto ? "opacity-0" : ""}`} />

                         <span className={`w-7 h-0.5 bg-black transition-all duration-300
                              ${aberto ? "-translate-y-2 -rotate-45" : ""}`} />
                    </button>

                    <div className={`absolute left-4 top-12 w-48 bg-white text-black
                         rounded-xl shadow-lg p-3 flex flex-col gap-3
                         transition-all duration-300 z-10
                         ${aberto
                              ? "opacity-100 scale-100 visible"
                              : "opacity-0 scale-95 invisible"
                         }`}
                    >
                         <Link href="#" className="cursor-pointer">Membros</Link>
                         <Link href="#" className="cursor-pointer">Questões</Link>
                    </div>
               </div>
               <Link href={`/users/${user}/perfil`}>
                    <button className=" pr-2 pt-1 cursor-pointer pl-2 self-end">
                         <Image width={512} loading="eager" height={512} alt="foto" src={perfil} className="w-12! h-12! rounded-full object-cover bg-white" />
                    </button>
               </Link>
          </header>
     )
}