import mariadb from "mariadb";
import "dotenv/config";

const u = new URL(process.env.DATABASE_URL);

try {
  const conn = await mariadb.createConnection({
    host: u.hostname,
    port: Number(u.port || 3306),
    user: decodeURIComponent(u.username),
    password: decodeURIComponent(u.password),
    database: u.pathname.slice(1),
    allowPublicKeyRetrieval: true,
    connectTimeout: 10000,
  });
  console.log(await conn.query("SELECT 1 AS ok"));
  await conn.end();
} catch (e) {
  console.error(e.code, e.message);
}