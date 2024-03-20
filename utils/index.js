// module imports
import fs from "fs/promises";

async function readFromDB() {
  const data = await fs.readFile("../db.txt", "utf-8");
  console.log(data);
}

readFromDB();
