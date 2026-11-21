"use client";
import { ReactNode, useRef, useState } from "react"
import { salvarQuestoes } from "../../lib/criar";
import ParaLatex from "../processarstring";

export default function CriarQuestoes({ onContinuar }: { onContinuar: () => void }) {
     const [questoes, setQuestoes] = useState(1)
     const [erro, setErro] = useState("")
     const [apertado, setApertado] = useState(false);
     const [formatados, setFormatados] = useState<Record<string, string>>({});
     const formRef = useRef<HTMLFormElement>(null);
     const estilo = "outline-none w-full min-h-38 bg-white border-black border-2 rounded-lg field-sizing-content text-black focus:ring-2 focus:ring-black";

     function campo(nome: string, rotulo: string) {
          return (
               <>
                    <label htmlFor={nome} className="text-black font-bold tracking-wider text-lg">{rotulo}</label>
                    <textarea name={nome} id={nome} className={`${estilo} ${apertado ? "hidden" : "p-2"}`}></textarea>
                    {apertado && (
                         <div className={`${estilo} p-2 text-left`}>
                              <ParaLatex texto={formatados[nome]} />
                         </div>
                    )}
               </>
          )
     }

     const componentes: ReactNode[] = [<div className="flex flex-col text-center" key={0}>{campo("enunciado", "Enunciado")}</div>];

     for (let i = 1; i <= questoes; i++) {
          componentes.push(
               <div className="flex flex-col text-center" key={i}>
                    {campo(`q${i}`, `Enunciado do ${i}º item`)}
                    {campo(`r${i}`, `Resposta do ${i}º item`)}
               </div>
          );
     }
     async function enviar(e: React.SubmitEvent<HTMLFormElement>) {
          e.preventDefault();
          const dados: Record<string, string> = {}
          new FormData(e.currentTarget).forEach((v, k) => {
               dados[k] = String(v)
          })
          const res = await salvarQuestoes(dados);
          if (res.erro) return setErro(res.erro);
          onContinuar();
     }
     function mostrar() {
          if (!apertado) {
               const dados: Record<string, string> = {}
               new FormData(formRef.current!).forEach((v, k) => (
                    dados[k] = String(v)
               ))
               setFormatados(dados)
          }
          setApertado(!apertado);
     }
     return (
          <div className="flex flex-col flex-1 min-h-screen  font-sans foreground overflow-y-scroll">
               <main className="flex flex-1 w-full flex-col items-center mt-2">
                    <form className="mb-6 flex flex-col justify-center items-center" ref={formRef} onSubmit={enviar}>
                         <div className="w-[calc(100dvw-2rem)] px-4 py-4 rounded-2xl border-2 max-w-120 bg-beige dark:border-0">

                              {componentes}
                              <div className="flex flex-row gap-4 mt-2 justify-between">
                                   <div className="flex flex-row gap-4 mt-2">
                                        <button type="button" onClick={() => setQuestoes(q => Math.min(q + 1, 3))}
                                             className="bg-white w-8 h-8 rounded-xl text-2xl text-black leading-none items-center 
                                             cursor-pointer hover:bg-stone-500 focus:bg-stone-500 justify-center flex border border-black">+</button>
                                        <button type="button" onClick={() => setQuestoes(q => Math.max(1, q - 1))}
                                             className="bg-white w-8 h-8 rounded-xl text-2xl text-black border border-black
                                             cursor-pointer hover:bg-stone-500 focus:bg-stone-500 leading-none flex items-center justify-center">-</button>
                                   </div>
                                   <div className="flex flex-row gap-4 mt-2">
                                        <button type="button" onClick={() => mostrar()}
                                             className="bg-white w-8 h-8 rounded-xl text-black leading-none items-center 
                                             cursor-pointer justify-center flex border border-black text-sm">
                                             {apertado ? <i className="fa-solid fa-eye" /> : <i className="fa-solid fa-eye-slash" />}</button>
                                   </div>
                              </div>
                         </div>
                         {erro && <span className="text-red-600">{erro}</span>}
                         <button type="submit" className="select-none cursor-pointer mt-4 mb-20 px-6 py-2 rounded-2xl bg-green-500 hover:bg-green-700
                              focus:bg-green-800 dark:text-black">Continuar</button>
                    </form>

               </main>
          </div>
     )
}