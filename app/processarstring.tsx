"use client";
import katex from "katex";
import "katex/dist/katex.min.css";
import { parse } from "mathjs";

function Formula({ texto }: { texto: string }) {
     try {
          const tex = parse(texto).toTex();
          const html = katex.renderToString(tex, {
               throwOnError: false, // se estiver inválido, mostra o texto cru em vez de quebrar
               displayMode: false,
          });
          return <span dangerouslySetInnerHTML={{ __html: html }} />;
     } catch {
          return <span className="text-red-600 underline decoration-wavy" title="Notação inválida">{texto}</span>
     }
}
export default function ParaLatex({ texto }: { texto: string }) {
     const partes = texto.split("$")
     return (
          <span className="whitespace-pre-wrap">
               {partes.map((p, i) => i % 2 == 1 && i < partes.length - 1 ? (
                    <Formula key={i} texto={p} />
               ) : <span key={i}>
                    {i % 2 === 1 ? `$${p}` : p}
               </span>)}
          </span>
     )
}