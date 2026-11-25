"use server";
import { prisma } from "@/lib/prisma";
import { criarSessao } from "./session";
export default async function Autenticar({ user, password }: { user: string, password: string }) {
     try {
          const usuario = await prisma.user.findUnique({ where: { usuario: user } });
          // ...resto igual

          if (!usuario) return null;
          if (usuario.senha !== password) return null;
          await criarSessao(usuario.usuario);
          return {
               username: usuario.usuario,
               permissao: usuario.permissao
          };
     } catch (e) {
          console.error("Falha no login:", e);
          return null;
     }
}
export async function CriarUser({ user, password }: { user: string, password: string }) {
     const usuario = await prisma.user.findUnique({
          where: { usuario: user },
     });
     if (usuario) return "Usuario Ja existe";
     if (!user.trim()) return "Usuario nao pode estar vazio";
     if (!password.trim() || (password.indexOf(" ") !== -1)) return "Senha Invalida";
     if ((password.length < 8) || (password.length > 18)) return "Senha tem que ter entre 8 a 18 caracteres"
     await prisma.user.create({
          data: {
               usuario: user,
               senha: password,
               permissao: false

          }
     })
     await criarSessao(user);

}