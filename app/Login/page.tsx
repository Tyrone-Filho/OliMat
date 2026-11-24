"use client";
import Autenticar from "@/lib/users";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
export default function Page() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("")
  const router = useRouter();



  async function HandleErro(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    setErro("");

    if (!user.trim() || !password.trim()) {
      setErro("Preencha todos os campos");
      return;
    }
    if (!/^[A-Za-z0-9_.-]+$/.test(user)) {
      setErro("Use apenas letras, números, _ . e -");
      return;
    }
    try {

      const dados = await Autenticar({ user, password });


      if (!dados) {
        setErro("Usuário ou senha inválidos");
        return;
      }

      router.push(
        dados.permissao
          ? `/Adm/${dados.username}`
          : `/users/${dados.username}`
      );

    } catch (error) {
      console.error("Erro no login:", error);
      setErro("Erro ao realizar login");
    }
  }

  return (
    <div className="flex flex-col flex-1 h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full flex-col items-center justify-center bg-[#fff7ed] dark:bg-black">
        <div className="flex flex-col px-4 py-16 w-[calc(100dvw-4rem)] max-w-71 rounded-2xl bg-beige border-2 border-stone-600  dark:bg-black">
          <form className="flex au flex-col w-full" onSubmit={(e) => HandleErro(e)}>
            <div className="relative mb-3">
              <input type="text" id="username" required placeholder="Username" className={`peer dark:border-green-700 rounded-md
                        p-2 focus:outline-none focus:ring-1 border-2 border-black dark:border dark:focus:ring-green-800 w-full
                        placeholder:text-transparent `} onChange={(e) => setUser(e.target.value)} />
              <label htmlFor="username" className="left-1 absolute text-[#1e3a5f] font-bold dark:text-green-500 peer-placeholder-shown:text-2xl text-sm peer-focus:text-sm transition-all duration-300 
                    ease-in-out translate-y-1.5 peer-not-placeholder-shown:-translate-y-2.5 peer-not-placeholder-shown:translate-x-6 px-1.5
                    peer-focus:translate-x-6 peer-focus:-translate-y-2.5 rounded-2xl bg-beige dark:bg-black cursor-text">
                Username

              </label>
            </div>
            <div className="relative">
              <input type="password" required id="password" placeholder="Password" className={`peer border-2 dark:border dark:border-green-700 rounded-md 
                        p-2 focus:outline-none focus:ring-1 dark:focus:ring-green-800 w-full
                        placeholder:text-transparent
                        `} onChange={(e) => setPassword(e.target.value)} />
              <label htmlFor="password" className="left-1 absolute text-[#1e3a5f] font-bold dark:text-green-500 peer-placeholder-shown:text-2xl text-sm peer-focus:text-sm transition-all duration-300 
                    ease-in-out translate-y-1.5 peer-not-placeholder-shown:-translate-y-2.5 peer-not-placeholder-shown:translate-x-6 px-1.5
                    peer-focus:translate-x-6 peer-focus:-translate-y-2.5 rounded-2xl bg-beige dark:bg-black cursor-text">
                Password

              </label>
            </div>
            {erro && <p className="text-red-600">{erro}</p>}
            <button type="submit" className={`dark:bg-green-600 text-white bg-[#1e3a5f] rounded-md p-2 text-center dark:hover:bg-green-800 ${erro ? "mt-2" : "mt-4"}
                 hover:cursor-pointer dark:focus:bg-green-800`}>Login</button>
          </form>
          <div className="relative">
            <Link href={"/Signup"} className="text-lg text-orange-600 dark:text-cyan-300 leading-relaxed cursor-pointer mt-2">
              <p >Ainda não tem uma conta?</p>
            </Link>

          </div>
        </div>
      </main>
    </div>
  )
}