"use server";
import { cache } from "react";
import { prisma } from "./prisma";
import { criarSessao, Ler } from "./session";
import { notFound, redirect } from "next/navigation";

export const BuscarUser = cache((user: string) =>
     prisma.user.findUnique({
          where: {
               usuario: user
          }, omit: {
               senha: true
          }
     })
);

export const sessaoAtual = cache(Ler)


export async function AlterarUserName({ userAtual, novoUser }: { userAtual: string, novoUser: string }) {
     const usuario = await BuscarUser(userAtual);
     if (!usuario) redirect("/");
     const novoUserdb = await BuscarUser(novoUser);
     if (novoUserdb) return { erro: "Nome De Usuario Já Existe" }
     if (!novoUser.trim() || !userAtual.trim()) {
          return { erro: "Preencha todos os campos" };
     }
     if (!/^[A-Za-z0-9_.-]+$/.test(novoUser)) {
          return { erro: "Use apenas letras, números, _ . e -" };
     }
     await prisma.user.update({
          where: {
               usuario: userAtual,
          }, data: {
               usuario: novoUser,
          }, omit: {
               senha: true
          }
     })
     await criarSessao(novoUser);
     return {ok:true}
}

export async function ExigirDono(nomeUser: string) {
     const sessao = await sessaoAtual();
     if (!sessao) redirect("/");
     const dono = sessao.username === nomeUser;
     if (!dono) notFound();

}