import { ExigirDono } from "@/lib/queries";
import CriarQuestoes from "./criarquestoes";
import { Suspense } from "react";
import Loading from "@/app/components/loading";

async function Conteudo({ params }: { params: Promise<{ user: string }>; }) {
     const { user } = await params;
     await ExigirDono(user);
     return <CriarQuestoes user={user} />
}
export default async function Criar(props: { params: Promise<{ user: string }>; }) {
     return (
          <Suspense fallback={<Loading />}>
               <Conteudo {...props} />
          </Suspense>
     )
}