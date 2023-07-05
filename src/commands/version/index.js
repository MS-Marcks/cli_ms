import { readJSONFile } from "../../utils/readJson.js";
import { banner } from "../../utils/banner.js";

export async function command_version() {
    console.log("");
    banner("MS DB");
    console.log(`
    MS DB CLI: ${readJSONFile('package.json').version}
    Node: ${process.version}
    `);
}