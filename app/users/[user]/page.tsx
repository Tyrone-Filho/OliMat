import Header from "@/app/components/header";
import ParaLatex from "@/app/processarstring";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BuscarUser, ExigirDono } from "@/lib/queries";
import { Suspense } from "react";
import Loading from "@/app/components/loading";

async function Conteudo({ params }: { params: Promise<{ user: string }>; }) {
  const { user } = await params;
  await ExigirDono(user)
  const usuario = await BuscarUser(user)
  if (!usuario) notFound();
  return (
    <div className="flex flex-col flex-1 min-h-screen itens-center font-sans bg-white">
      <Header user={usuario.usuario} />
      <main className="flex flex-1 w-full flex-col itens-center mt-2 foreground gap-15">
        <h1 className="text-2xl text-black self-center">Bem Vindo UserPlaceHolder</h1>
        <div className="w-[calc(100dvw-4rem)] flex flex-col md:grid grid-cols-2 gap-4 ">
          <div className="flex flex-col flex-1 bg-[#c8d1d9] p-4 rounded-2xl">
            <p className="text-xl font-bold tracking-wider text-green-400 text-shadow-black text-shadow-lg self-center">Instrucoes</p>
            <div className="mt-2 mb-2">
              <p className="mb-4 text-lg tracking-wider text-black">Cada questão você podera colocar de 1 a 3 itens <br /> (todos discursivos)</p>
              <p className="mb-4 text-lg tracking-wider text-black">Você precisara colocar as respostas desses itens,você pode apertar no olhinho para ver como esta ficando</p>
              <p className=" text-lg tracking-wider text-black">Você precisara colocar o enunciado da questao</p>
            </div>
          </div>
          <div className="flex flex-col flex-1 bg-[#c8d1d9] p-4 rounded-2xl">
            <p className="text-xl font-bold tracking-wider text-green-400 text-shadow-lg text-shadow-black self-center">Exemplos de Notação</p>
            <div className="mt-2 mb-2 text-black">
              <article className="flex relative">
                <ParaLatex texto="$x^2$" />
                <span className="pl-4 pr-2 text-black">=</span>
                <span>$x^2$</span>
              </article>

              <article className="flex relative mt-4">
                <ParaLatex texto="$x^(2*x^(2x))$" />
                <span className="pl-4 pr-2 text-black">=</span>
                <span>$x^(2*x^(2x))$</span>
              </article>
              <article className="flex relative mt-4">
                <div className="flex flex-col">
                  <ParaLatex texto="$x/15$" />
                </div>
                <div className="mt-2.5">
                  <span className="pl-4 pr-2 text-black">=</span>
                  <span>$x/15$</span>
                </div>
              </article>
              <article className="flex relative mt-4">
                <div className="flex flex-row">
                  <div className="flex flex-row">
                    <ParaLatex texto="$15*x*2$" />
                  </div>
                  <span className="ml-2">= $x*15*2$</span>
                </div>
              </article>
              <article>
                Outras notações como $x+x$ ou $x-x$ continuam iguais
              </article>
            </div>
            <p className="text-sm text-black">
              Para evitar problemas escreva todas notações em sua forma mais simples exemplo $x+x+x$ = $3*x$
            </p>
          </div>
        </div>
      </main>
      <Link href={`${usuario.usuario}/criar`}>
        <button className="select-none cursor-pointer mt-4 px-6 py-2 rounded-2xl bg-green-500 hover:bg-green-800
                     focus:bg-green-800 :text-black mb-10" >Continuar</button>
      </Link>
    </div>
  )
}
export default async function Instrucoes(props: { params: Promise<{ user: string }>; }) {
  return (
    <Suspense fallback={<Loading />}>
      <Conteudo {...props} />
    </Suspense>
  );
}