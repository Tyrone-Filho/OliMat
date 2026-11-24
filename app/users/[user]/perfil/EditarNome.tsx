"use client";

import { useState } from "react";

export default function EditarNome({ atual }: { atual: string }) {
     const [aberto,setAberto] = useState(false);  
     return (
          <div className="flex flex-col h-40 ml-7 mt-18">
               <button className="flex flex-row items-start bg-white m-2 truncate max-w-40 rounded-2xl gap-2 cursor-pointer">
                    <h1 className="text-black text-2xl">{atual}</h1>
                    <i className="fa-solid fa-pen text-black mt-2" />
               </button>
          </div>
     )
}