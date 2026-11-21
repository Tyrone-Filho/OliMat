"use client";
import Header from "@/app/components/header";
import CriarQuestoes from "@/app/questoes/criarquestoes";
import Instrucoes from "@/app/questoes/instrucoes";
import { useSearchParams, useRouter } from "next/navigation";

type Etapa = "instrucoes" | "criar" | "perfil"
export default function Etapas({ perfil }: { perfil: React.ReactNode }) {
     const router = useRouter();
     const params = useSearchParams();
     const etapa = (params.get("etapa" as Etapa)) ?? "instrucoes"
     function ir(proxima: Etapa) {
          router.push(`?etapa=${proxima}`);
     }
     return (
          <div>
               {etapa === "perfil" ? <Header onContinuar={() => ir("instrucoes")} /> : <Header onContinuar={() => ir("perfil")} />}
               {
                    etapa === "instrucoes" ? (<Instrucoes onContinuar={() => ir("criar")} />)
                         : (etapa === "perfil" ? perfil : <CriarQuestoes onContinuar={() => ir("perfil")} />)
               }
          </div>
     )
}