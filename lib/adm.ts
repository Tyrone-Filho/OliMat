import "server-only";
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { sessaoAtual } from "./queries";

export async function exigirAdm() {
     const sessao = await sessaoAtual();
     if (!sessao) redirect("/");
     const adm = await prisma.user.findUnique({
          where: {
               usuario: sessao.username
          }, omit: {
               senha: true
          }
     });
     if (!adm || !adm.permissao) notFound();
     return adm
}