import { Suspense } from "react";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import Loading from "@/app/components/loading";
import Etapas from "./Etapas";
import Perfil from "./Perfil";
import { connection } from "next/server";
import { lerSessao } from "@/lib/session";

async function PaginaPrincipal({ params, }: { params: Promise<{ user: string }>; }) {
  await connection();
  const { user } = await params;
  const sessao = await lerSessao();
  if (!sessao) redirect("/")
  const pessoa = await prisma.user.findUnique({
    where: {
      usuario: user
    }
  });
  if (!pessoa) notFound();
  return (
    <Etapas perfil={<Perfil nomeUser={user} />} />
  )
}
export default async function Page({
  params,
}: {
  params: Promise<{ user: string }>;
}) {
  return <Suspense fallback={<Loading />}>
    <PaginaPrincipal params={params} />
  </Suspense>;
}