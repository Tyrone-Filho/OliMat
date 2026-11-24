"use server";

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { sessaoAtual } from "./queries";

type Dados = Record<string, string>;

export async function salvarQuestoes(dados: Dados) {
     const sessao = await sessaoAtual()
     if (!sessao) return { erro: "Voce precisa estar logado" }
     const usuario = await prisma.user.findUnique({ where: { usuario: sessao.username } })
     if (!usuario) return notFound();

     const { enunciado, q1, r1, q2, r2, q3, r3 } = dados;
     if (!enunciado.trim().trim() || !q1.trim() || !r1.trim()) return { erro: "Preencha os campos do 1º item" }
     if (q2 && (!q2.trim() || !r2.trim())) return { erro: "Preencha os campos do 2º item" }
     if (q3 && (!q3.trim() || !r3.trim())) return { erro: "Preencha os campos do 3º item" }
     const existe = prisma.perguntas.findFirst({
          where: {
               enunciado: enunciado.trim(),
               q1: q1.trim(), r1: r1.trim(),
               q2: q2 ? q2.trim() : null, r2: r2 ? r2.trim() : null,
               q3: q3 ? q3.trim() : null, r3: r3 ? r3.trim() : null,
               userId: usuario.id
          }
     })
     if (!existe) return { erro: "Clique Apenas 1 vez" }
     await prisma.perguntas.create({
          data: {
               enunciado: enunciado.trim(),
               q1: q1.trim(), r1: r1.trim(),
               q2: q2 ? q2.trim() : null, r2: r2 ? r2.trim() : null,
               q3: q3 ? q3.trim() : null, r3: r3 ? r3.trim() : null,
               userId: usuario.id

          }
     })
     return { ok: true }
}