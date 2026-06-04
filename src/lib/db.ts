import { drizzle } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";
import * as schema from "./db/schema";

let _db: ReturnType<typeof drizzle<typeof schema>> | null = null;

export function getDb() {
  if (!_db) {
    const url = process.env.TURSO_DATABASE_URL || process.env.DATABASE_URL;
    if (!url) {
      throw new Error("请设置 TURSO_DATABASE_URL 或 DATABASE_URL 环境变量");
    }
    const client = createClient({
      url,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
    _db = drizzle(client, { schema });
  }
  return _db;
}

// 兼容旧代码：延迟代理
export const db = new Proxy(
  {} as ReturnType<typeof drizzle<typeof schema>>,
  {
    get(_target, prop, receiver) {
      const database = getDb();
      const desc = Object.getOwnPropertyDescriptor(
        Object.getPrototypeOf(database),
        prop
      );
      if (desc && typeof desc.value === "function") {
        return desc.value.bind(database);
      }
      return Reflect.get(database, prop, receiver);
    },
  }
);
