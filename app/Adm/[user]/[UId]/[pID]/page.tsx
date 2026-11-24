import { Header } from "@/app/components/header";
import Loading from "@/app/components/loading";
import ParaLatex from "@/app/processarstring";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { exigirAdm } from "../../../../../lib/adm";

const estilo = "outline-none min-h-38 bg-white border-black border-2 rounded-lg field-sizing-content text-black focus:ring-2 focus:ring-black";
function Campo({ texto, rotulo }: { texto: string | null, rotulo: string }) {
     if (!texto) return null
     return (
          <>
               <label className="text-black font-bold tracking-wider text-lg">{rotulo}</label>
               <div className={`${estilo} p-2 text-left w-full`}>
                    <ParaLatex texto={texto} />
               </div>
          </>
     )
}


async function ConteudoPagina({ params }: { params: Promise<{ user: string, UId: string, pID: string }>; }) {
     const { user, UId, pID } = await params;
     const usuario = await exigirAdm();

     const idUser = Number(UId);
     const idPergunta = Number(pID);
     if (!Number.isInteger(idPergunta) || !Number.isInteger(idUser)) notFound();

     const usuarioPergunta = await prisma.user.findUnique({
          where: {
               id: idUser
          }, omit: {
               senha: true
          }
     })
     if (!usuarioPergunta) notFound();
     const pergunta = await prisma.perguntas.findFirst({
          where: {
               id: idPergunta, userId: idUser
          }, include: {
               user: true
          }
     })
     if (!pergunta) notFound();

     const itens = [
          { q: pergunta.q1, r: pergunta.r1 },
          { q: pergunta.q2, r: pergunta.r2 },
          { q: pergunta.q3, r: pergunta.r3 },
     ]




     return (
          <div className="flex flex-col min-h-screen  w-dvw">
               <Link href={`/Adm/${usuario.usuario}`}>
                    <Header />
               </Link>
               <main className="flex flex-col min-h-80 items-center self-center bg-beige m-2 w-[calc(100dvw-4rem)]  max-w-120 rounded-2xl gap-2">
                    <h1 className="text-black text-2xl">Perfil de {usuarioPergunta.usuario}</h1>
                    <span className="text-black text-2xl">Questões Contribuidas:</span>
                    <div className="flex flex-col w-[calc(100%-4rem)] text-center gap-4">
                         <Campo texto={pergunta.enunciado} rotulo="Enunciado" />
                         {itens.map((it, i) => (
                              <div key={i}>
                                   <Campo texto={it.q} rotulo={`Enunciado do ${i + 1}º item`} />
                                   <Campo texto={it.r} rotulo={`Resposta do ${i + 1}º item`} />
                              </div>
                         ))}
                    </div>
               </main>
          </div>
     )
}


export default function Page({ params }: { params: Promise<{ user: string, UId: string, pID: string }>; }) {
     return (
          <Suspense fallback={<Loading />}>
               <ConteudoPagina params={params} />
          </Suspense>
     )
}