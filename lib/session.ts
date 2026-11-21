
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = process.env.SESSION_SECRET;

if (!secret) {
     throw new Error("SESSION_SECRET não encontrada");
}

const key = new TextEncoder().encode(secret);

export async function criarSessao(username: string) {
     const token = await new SignJWT({ username })
          .setProtectedHeader({ alg: "HS256" })
          .setIssuedAt()
          .setExpirationTime("7d")
          .sign(key);

     const cookieStore = await cookies();

     cookieStore.set("session", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
     });
}

export async function lerSessao() {
     const cookieStore = await cookies();


     const token = cookieStore.get("session")?.value;


     if (!token) return null;

     try {
          const { payload } = await jwtVerify(token, key);

          return payload as { username: string };
     } catch (error) {
          return null;
     }
}