import { PrismaPg } from "@prisma/adapter-pg";
import fs from "node:fs";
import { type PrismaConfig } from "prisma/config";

function adapter(): Promise<PrismaPg> {
  const config = JSON.parse(fs.readFileSync("config.json", "utf-8"));

  if (!config.database.url) {
    throw new Error("Database URL is not defined in the configuration.");
  }

  return Promise.resolve(
    new PrismaPg({
      connectionString: config.database.url,
    }),
  );
}

export default {
  earlyAccess: true,
  migrate: {
    adapter,
  },
  studio: {
    adapter,
  },
} satisfies PrismaConfig;
