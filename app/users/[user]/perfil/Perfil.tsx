import { HeadePerfilTsx } from "@/app/components/header";
import { prisma } from "@/lib/prisma";
import { BuscarUser } from "@/lib/queries";
import Link from "next/link";
import { notFound } from "next/navigation";
import EditarNome from "./EditarNome";

export default async function Perfil(user: { user: string }) {
     const usuario = await BuscarUser(user.user)
     if (!usuario) notFound();
     const perguntas = await prisma.perguntas.findMany({
          where: {
               userId: usuario.id
          }
     });
     //Fazer Bio e ter como editar a bio
     //Fazer ter como mudar o nome
     return (
          <div className="flex flex-col min-h-screen items-start w-full bg-white">
               <HeadePerfilTsx user={usuario.usuario} />
               <EditarNome atual={user.user} />
               <div className="flex flex-col items-center md:items-baseline md:text-center md:grid md:grid-cols-3 w-full mt-4 gap-8 md:gap-y-4 px-4">
                    {perguntas.length > 0 ? perguntas.map((p) => (
                         <Link href={`/users/${usuario.usuario}/${p.id}`} key={p.id} className="overflow-hidden bg-[#c8d1d9] rounded-xl text-black
                    px-2 py-1 cursor-pointer w-[calc(100%-1rem)] md:max-w-[calc(100%-5rem)] h-26 focus:bg-zinc-400 hover:bg-zinc-400">
                              <span className="font-bold">Questão {p.id}</span>
                              <br /> <span>{p.enunciado}</span>
                         </Link>
                    )) : <span className="text-red-700 text-lg md:col-start-2">Nenhuma Questão Contribuida</span>}
               </div>
          </div>
     );
}