import { prisma } from "@/lib/prisma";
import { lerSessao } from "@/lib/session";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";

export default async function Perfil({ nomeUser }: { nomeUser: string }) {
     const sessao = await lerSessao();
     if (!sessao) redirect("/");
     const usuario = await prisma.user.findUnique({
          where: {
               usuario: nomeUser
          }
     });
     if (!usuario) notFound();
     const dono = sessao.username === nomeUser;
     if (!dono) notFound();
     const perguntas = await prisma.perguntas.findMany({
          where: {
               userId: usuario.id
          }
     });
     return (
          <div className="flex flex-col min-h-screen items-center w-dvw">
               <main className="flex flex-col min-h-80 items-center bg-beige m-2 w-[calc(100dvw-4rem)]  max-w-120 rounded-2xl gap-2">
                    <h1 className="text-black text-2xl">Olá {usuario.usuario} Bem vindo(a)</h1>
                    <span className="text-black text-2xl">Questões Contribuidas:</span>
                    {perguntas.length > 0 ? perguntas.map((p) => (
                         <Link href={`/users/${usuario.usuario}/${p.id}`} key={p.id} className="truncate bg-white border-2 border-black rounded-xl text-black
                         px-2 py-1 cursor-pointer max-w-[calc(100%-5rem)] focus:bg-zinc-300 hover:bg-zinc-300">{p.enunciado}</Link>
                    )) : <span className="text-red-700 text-lg">Nenhuma Questão Contribuida</span>}
               </main>
          </div>
     )
}