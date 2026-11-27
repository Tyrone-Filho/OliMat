"use client";

import { AlterarUserName } from "@/lib/queries";
import { useRouter } from "next/navigation";
import { useState } from "react";




export default function Editar({ atual,tipo }: { atual: string, tipo: string }) {
     const [aberto,setAberto] = useState(false);  
     const [novoUser, setNovoUser] = useState(atual);
     const [erro,setErro] = useState("");
     const router = useRouter()
     function handleClick(e: React.MouseEvent<HTMLFormElement, MouseEvent>) {
          e.stopPropagation();
     }
     function clicarFora(){
          setAberto(false);
          setErro("");
          setNovoUser(atual);
     }
     async function handleSubmit(e: React.SubmitEvent<HTMLFormElement>,atual:string,novoUser:string) {
          e.preventDefault();
          const erroForm = await AlterarUserName({ userAtual: atual, novoUser: novoUser });
          if (erroForm.erro){
               setErro(erroForm.erro);
               return;
          }
          router.replace(`users/${novoUser}`)
          
     }
     return (
          <>
               <div className="flex flex-col w-fit max-w-[40dvw] h-40 wrap-anywhere ml-7 mt-18">
                    <button className="flex flex-row items-start bg-white m-2 
                    rounded-2xl gap-2 cursor-pointer" onClick={() => setAberto(true)}>
                         <h1 className="text-black text-2xl">{atual}</h1>
                         <i className="fa-solid fa-pen text-black mt-2" />
                    </button>
               </div>
               <section className={`flex flex-col absolute justify-center items-center bg-[rgba(200,209,217,0.2)]  w-screen h-screen px-2 py-4 rounded-2xl pt-3 pb-5 gap-2 ${aberto ? "" : "hidden"}`} onClick={() => clicarFora()}>
                    <div className="flex flex-col"> 
                         <form className="flex flex-col items-center w-70 min-h-60 h-fit border border-black bg-white rounded-2xl gap-4" onSubmit={(e) => handleSubmit(e,atual,novoUser)} onClick={(e) => handleClick(e)}>
                              <h1 className="text-black text-2xl mt-4">Editar {tipo}</h1>
                              <textarea onChange={(e) => setNovoUser(e.target.value)} className="field-sizing-content resize-none w-40 min-h-6 py-2 rounded-lg border border-black text-black px-2" value={novoUser} />
                              {erro && <span className="text-red-600  ">{erro}</span>}
                              <button className="w-20 h-10 rounded-lg border border-black text-black justify-end cursor-pointer hover:bg-green-600 focus:bg-green-600 bg-green-400">Salvar</button>
                         </form>
                    </div>
               </section>
          </>
     )
}