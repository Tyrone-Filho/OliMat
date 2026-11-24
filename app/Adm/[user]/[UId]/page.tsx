import Header from "@/app/components/header";
import Loading from "@/app/components/loading";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { exigirAdm } from "@/lib/adm";

async function ConteudoPagina({ params }: { params: Promise<{ user: string, UId: string }>; }) {
     const { user, UId } = await params;
     const usuario = await exigirAdm();
     const idUser = Number(UId);
     if (!Number.isInteger(idUser)) notFound();
     const usuarioPergunta = await prisma.user.findUnique({
          where: {
               id: idUser
          }, omit: {
               senha: true
          }
     })
     if (!usuarioPergunta) notFound();
     const perguntas = await prisma.perguntas.findMany({
          where: {
               userId: usuarioPergunta.id
          }
     })
     if (!perguntas) notFound();
     return (
          <div className="flex flex-col min-h-screen items-center w-dvw">
               <Link className="self-end" href={`/Adm/${usuario.usuario}`}>
                    <Header user={usuario.usuario} />
               </Link>
               <main className="flex flex-col min-h-80 items-center bg-beige m-2 w-[calc(100dvw-4rem)]  max-w-120 rounded-2xl gap-2">
                    <h1 className="text-black text-2xl">Perfil de {usuarioPergunta.usuario}</h1>
                    <span className="text-black text-2xl">Questões Contribuidas:</span>
                    {perguntas.length > 0 ? perguntas.map((p) => (
                         <Link href={`/Adm/${user}/${p.userId}/${p.id}`} key={p.id} className="truncate bg-white border-2 border-black rounded-xl text-black
                         px-2 py-1 cursor-pointer max-w-[calc(100%-5rem)] focus:bg-zinc-300 hover:bg-zinc-300">{p.enunciado}</Link>
                    )) : <span className="text-red-700 text-lg">Nenhuma Questão Contribuida</span>}
               </main>
          </div>
     )
}


export default function Page({ params }: { params: Promise<{ user: string, UId: string }>; }) {
     return (
          <Suspense fallback={<Loading />}>
               <ConteudoPagina params={params} />
          </Suspense>
     )
}