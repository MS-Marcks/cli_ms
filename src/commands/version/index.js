import { readJSONFileModule } from "../../utils/readJson.js";
import { banner } from "../../utils/banner.js";

export async function command_version() {
    console.log("");
    banner("MS DATABASE");
    console.log(`
    MS DATABASE CLI: ${readJSONFileModule('package.json').version}
    Node: ${process.version}
    `);
}