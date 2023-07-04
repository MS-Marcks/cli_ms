const command_version = require("./version");
const command_create_project = require("./new");


module.exports = {
    command_version,
    command_create_project,
}
/*const path = require("path");
const fs = require("fs");
const baseDir = path.resolve(".");
//const config = require(path.join(baseDir, "config.json"));
const config = require("../../config.json");
const query = require("../config/scripts/cli.db");
const { GET_LIST_TABLES } = require("../config/scripts/" + config.database.engine);

function generateDirectory() {
    if (!fs.existsSync(path.join(baseDir, config.outDir))) {
        fs.mkdirSync(path.join(baseDir, config.outDir));
    }
}

async function command_version() {

}

async function command_check() {
    try {
        const q = await query(`SELECT 1 AS exist`);
        if (q.code === 200) {
            const result = q.query;
            if (result[0].exist === 1) {
                console.log("CONEXIÓN VALIDA");
            } else {
                console.log("CONEXIÓN INVALIDA");
            }
        } else if (q.code === 404) {
            console.log(q.err);
        }
    } catch (err) {
        console.log(err);
    }
}
async function command_list_table() {
    try {
        const q = await query(`${GET_LIST_TABLES}`);
        if (q.code === 200) {
            const result = q.query;
            console.log(`|\t\tTABLAS\t\t|`);
            for (let index = 0; index < result.length; index++) {
                console.log(`${result[index].Tables_in_ipedep}`);
            }
        } else if (q.code === 404) {
            console.log(q.err);
        }
    } catch (err) {
        console.log(err);
    }
}

function command_create(args) {
    generateDirectory();
    console.log('Ejecutando command1 con argumento:', args);
}
function command_search(arg) {
    generateDirectory();
    console.log('Ejecutando command1 con argumento:', arg);
}
function command_update(arg) {
    generateDirectory();
    console.log('Ejecutando command1 con argumento:', arg);
}
function command_delete(arg) {
    generateDirectory();
    console.log('Ejecutando command1 con argumento:', arg);
}
function command_all(arg) {
    generateDirectory();
    console.log('Ejecutando command1 con argumento:', arg);
}

module.exports = {
    command_version,
    command_check,
    command_list_table,
    command_create,
    command_search,
    command_update,
    command_delete,
    command_all
}*/