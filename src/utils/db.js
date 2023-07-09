'use strict';
import path from "path";
import url from 'url';
import { readJSONFileModule } from "./readJson.js";
const baseDir = path.join(path.dirname(url.fileURLToPath(import.meta.url)), "..", "..", "profiles");

const client = readJSONFileModule(path.join("profiles", "client.json"));
export const connect = {
    host: client.server,
    user: client.user,
    password: client.password,
    database: client.database,
    port: client.port,
    multipleStatements: true
}
