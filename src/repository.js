import { readFile, writeFile } from "fs/promises";
import { resolve, join, dirname } from "path";

export const save = async (data) => {
  const { pathname } = new URL(import.meta.url);
  const formattedPathname = pathname.replace(/^\/([a-z])\:/i, "$1:/");
  const databasePath = join(dirname(formattedPathname));
  const databaseFile = resolve(join(databasePath), "../database.json");

  const currentData = JSON.parse(await readFile(databaseFile));
  currentData.push(data);

  await writeFile(databaseFile, JSON.stringify(currentData));
};
