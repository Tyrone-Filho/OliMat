"use server";
import { exigirAdm } from "@/lib/adm";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function deletarPergunta(perguntaid: number) {
     await exigirAdm();
     await prisma.perguntas.delete({
          where: {
               id: perguntaid
          }
     })
     revalidatePath("/Adm", "layout")
}