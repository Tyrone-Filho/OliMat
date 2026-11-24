"use client";
import { ReactNode, useRef, useState } from "react"
import { salvarQuestoes } from "@/lib/criar";
import ParaLatex from "@/app/processarstring";
import { useRouter } from "next/navigation";

export default function CriarQuestoes(user: { user: string }) {
     const [questoes, setQuestoes] = useState(1)
     const [erro, setErro] = useState("")
     const [apertado, setApertado] = useState(false);
     const [formatados, setFormatados] = useState<Record<string, string>>({});
     const [enviando, setEnviando] = useState(false);
     const formRef = useRef<HTMLFormElement>(null);
     const router = useRouter()

     function campo(nome: string, rotulo: string) {
          return (
               <div className="relative">
                    <div className="ml-0.5 [clip-path:polygon(0%_0%,0%_100%,80%_100%,90%_0%)] pr-10 w-fit bg-black absolute top-0 pl-2 text-left">
                         <label htmlFor={nome} className="text-white font-bold tracking-wider text-lg">{rotulo}</label>
                    </div>
                    <div className="flex flex-col w-full mt-3">
                         <textarea name={nome} id={nome} className={`outline-none py-4  w-full min-h-38 bg-white text-left 
                         border-black border-2 rounded-3xl rounded-tl-none  ml-0.5
                         field-sizing-content text-black ${apertado ? "hidden" : ""}`}></textarea>
                         {apertado && (
                              <div className={`py-4 w-full min-h-38 ml-0.5 bg-white text-left border-black 
                         border-2 rounded-3xl rounded-tl-none text-black`}>
                                   <ParaLatex texto={formatados[nome]} />
                              </div>
                         )}
                    </div>
               </div>
          )
     }

     const componentes: ReactNode[] = [<div className="flex flex-col text-center" key={0}>{campo("enunciado", "Enunciado")}</div>];

     for (let i = 1; i <= questoes; i++) {
          componentes.push(
               <div className="flex flex-col text-center gap-4" key={i}>
                    {campo(`q${i}`, `${i}º item`)}
                    {campo(`r${i}`, `Resposta ${i}º item`)}
               </div>
          );
     }
     async function enviar(e: React.SubmitEvent<HTMLFormElement>) {
          e.preventDefault();
          if (enviando) return;
          setEnviando(true)
          const dados: Record<string, string> = {}
          new FormData(e.currentTarget).forEach((v, k) => {
               dados[k] = String(v)
          })
          setErro("");
          const res = await salvarQuestoes(dados);
          if (res.erro) {
               setErro(res.erro)
               setEnviando(false);
               return;

          }
          router.replace(`/users/${user.user}/perfil`)
          router.refresh();
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
          <div className="flex flex-col flex-1 min-h-screen font-sans bg-beige scrollbar-none">
               <main className="flex flex-1 w-full flex-col items-center mt-2">
                    <form className="mb-6 flex flex-col justify-center items-center" ref={formRef} onSubmit={enviar}>
                         <div className="w-[calc(100dvw-2rem)] px-4 py-4 rounded-2xl max-w-120 bg-beige ">
                              <div className="flex flex-col w-full gap-4 mb-4">
                                   {componentes}
                              </div>
                              <div className="flex flex-row gap-4 mt-2 justify-between">
                                   <div className={`flex flex-row gap-4 mt-2 `}>
                                        <button type="button" disabled={apertado} onClick={() => setQuestoes(q => Math.min(q + 1, 3))}
                                             className="bg-white w-8 h-8 rounded-xl text-2xl text-black leading-none items-center 
                                             cursor-pointer hover:bg-stone-500 disabled:cursor-not-allowed disabled:hover:bg-stone-500 focus:bg-stone-500 justify-center flex border border-black">+</button>
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
                         <button disabled={enviando} type="submit" className="select-none cursor-pointer mt-4 mb-20 px-6 py-2 rounded-2xl bg-green-500 hover:bg-green-700
                              focus:bg-green-800 text-black">Continuar</button>
                    </form>

               </main>
          </div>
     )
}