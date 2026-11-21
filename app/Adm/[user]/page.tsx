import ParaLatex from "@/app/processarstring";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { exigirAdm } from "../../../lib/adm";
import BotaoExcluir from "@/app/components/botaoExcluir";

async function PaginaPrincipal({ params, }: { params: Promise<{ user: string }>; }) {
  await connection();
  const { user } = await params;
  await exigirAdm();

  const UsuariosComPerguntas = await prisma.user.findMany({
    include: {
      questoes: true
    }
  })

  const total = UsuariosComPerguntas.reduce((n, u) => n + u.questoes.length, 0);
  return (

    <div className="flex flex-col flex-1 min-h-screen font-sans foreground">
      <Link className=" self-end pr-3 pt-3" href={`/`}>
        <button className="cursor-pointer bg-zinc-400 px-2 rounded-2xl border-2 border-black">
          <span className="text-black">Voltar</span>
        </button>
      </Link>
      <main className="flex flex-1 w-full flex-col self-center items-center mt-2 foreground">
        <div className="px-4 py-4 rounded-2xl bg-beige w-[calc(100dvw-4rem)] max-w-120 dark:bg-stone-400">
          {total === 0 && <p className="text-black">Nenhuma pergunta ainda.</p>}
          {UsuariosComPerguntas.flatMap((u) =>
            u.questoes.map((p) => (
              <section key={p.id} className="text-black p-2 flex flex-row">
                <div className="flex flex-col w-full">
                  <Link href={`/Adm/${user}/${p.userId}`} >
                    <h2 className="rounded-t-2xl bg-orange-300 border-2 border-b-0 border-black p-2 flex flex-row">
                      Pergunta feita por - {u.usuario}
                    </h2>
                  </Link>
                  <Link href={`/Adm/${user}/${p.userId}/${p.id}`}>
                    <div className="rounded-b-2xl bg-zinc-200 border-2 border-black p-2 pb-4 line-clamp-4">
                      <ParaLatex texto={p.enunciado} />
                    </div>
                  </Link>
                </div>
                <BotaoExcluir perguntaid={p.id} />
              </section>
            ))
          )}
        </div>
      </main >
    </div >
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  return <Suspense fallback={<p>Espere Porfavor</p>}>
    <PaginaPrincipal params={params} />
  </Suspense>;
}
