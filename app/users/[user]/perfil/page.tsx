import Loading from "@/app/components/loading";
import { ExigirDono } from "@/lib/queries";
import { Suspense } from "react";
import Perfil from "./Perfil";

async function Conteudo({ params }: { params: Promise<{ user: string }>; }) {
     const { user } = await params;
     await ExigirDono(user)
     return <Perfil user={user} />
}

export default function PerfilPage(props: { params: Promise<{ user: string }>; }) {
     return (
          <Suspense fallback={<Loading />}>
               <Conteudo {...props} />
          </Suspense>
     )
}