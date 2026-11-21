import { HeaderNoVoid } from "@/app/components/header";
import Loading from "@/app/components/loading";
import { prisma } from "@/lib/prisma";
import { lerSessao } from "@/lib/session";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import ParaLatex from "@/app/processarstring";
async function ConteudoPergunta({ params }: { params: Promise<{ user: string, perguntaId: string }>; }) {
     await connection();
     const { user, perguntaId } = await params;
     const sessao = await lerSessao();
     if (!sessao) redirect("/");
     const usuario = await prisma.user.findUnique({
          where: {
               usuario: user
          }
     });
     if (!usuario) notFound();
     const dono = sessao.username === user;
     if (!dono) notFound();
     const id = Number(perguntaId)
     if (!Number.isInteger(id)) notFound();
     const pergunta = await prisma.perguntas.findFirst({
          where: {
               id: id,
               userId: usuario.id
          }
     })
     if (!pergunta) redirect(`/users/${usuario.usuario}`)
     const componets = [pergunta.enunciado, pergunta.q1, pergunta.q2, pergunta.q3, pergunta.r1, pergunta.r2, pergunta.r3]
     return (
          <main className="h-screen w-screen">
               <Link href={`/users/${user}?etapa=instrucoes`}>
                    <HeaderNoVoid />
               </Link>
               <section className="flex flex-col items-center bg-beige ml-2 mr-2 rounded-2xl pt-3 pb-5 gap-2">
                    {componets.map((c, i) =>
                    (
                         <section key={i} className={`flex flex-col gap-1 ${c ? "" : "hidden"}`}>
                              <span className="text-center font-bold tracking-widest text-black">{i === 0 ? "Enunciado" : `${i <= 3 ? `${i}ª Pergunta` : `Resposta da ${i % 3}ª`}`}</span>
                              <div className="w-76 px-4 h-fit rounded-lg border border-black bg-zinc-300 text-black">
                                   {c ? <ParaLatex texto={c} /> : <></>}
                              </div>
                         </section>
                    )
                    )}
               </section>
          </main>
     )
}
export default async function PaginaPergunta({ params }: { params: Promise<{ user: string, perguntaId: string }> }) {
     return (
          <Suspense fallback={<Loading />}>
               <ConteudoPergunta params={params} />
          </Suspense>
     )
}