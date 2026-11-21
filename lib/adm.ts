import "server-only";
import { prisma } from "@/lib/prisma";
import { lerSessao } from "@/lib/session";
import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";

export async function exigirAdm() {
     const sessao = await lerSessao();
     if (!sessao) redirect("/");
     const adm = await prisma.user.findUnique({
          where: {
               usuario: sessao.username
          }
     });
     if (!adm || !adm.permissao) notFound();
     return adm
}