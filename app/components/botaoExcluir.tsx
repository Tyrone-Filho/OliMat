"use client";
import { deletarPergunta } from "../../lib/acoes";

export default function BotaoExcluir({ perguntaid }: { perguntaid: number }) {
     function confirmar(perguntaid: number) {
          if (!confirm("Deseja exluir essa pergunta")) return;
          deletarPergunta(perguntaid);
     }

     return (
          <button className="cursor-pointer w-8.5 h-8 rounded-full bg-red-600 self-center ml-1 border-2 border-black" onClick={() => confirmar(perguntaid)}>
               <i className="fa-solid fa-trash" />
          </button>
     )
}