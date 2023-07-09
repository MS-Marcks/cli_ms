import "../../utils/colors.js"
import inquirer from 'inquirer';
import jsonFormat from "json-format"
import path from "path";
import fs from "fs";
import url from 'url';
import { readJSONFileModule } from "../../utils/readJson.js";
import { query } from "../../utils/query.js";
import { CORE, CREATE, DELETE, GET_DATA_PARAMETERS, SEARCH, UPDATE } from "../../utils/mysql.js";
import { connect } from "../../utils/db.js";
//import { readFile } from "../../utils/readJson.js";

const baseDir = path.join(path.dirname(url.fileURLToPath(import.meta.url)), "..", "..", "..", "profiles");
const currentDir = path.resolve(".");

export function command_procedures() {
    let profileFile = readJSONFileModule(path.join("profiles", "profile.json"));
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Ingrese el nombre de la tabla:',
                validate: function (input) {
                    if (input) {
                        return true;
                    } else {
                        return 'Ingrese un nombre para el perfil';
                    }
                }
            }
        ])
        .then(async (answers) => {
            const q = await query(GET_DATA_PARAMETERS.replace("{{database}}", connect.database).replace("{{table}}", answers.name));
            if (q.code !== 200) {
                console.log(red("NO SE LOGRO CONECTAR A LA BASE DE DATOS"));
                return;
            }
            const result = q.query;
            let fields = "";
            let fields_input = "";
            let fields_update = "";
            let parameters = "";
            for (let index = 0; index < result.length; index++) {
                const field = result[index];
                if (index === (result.length - 1)) {
                    fields += field.COLUMN_NAME + "";
                    fields_input += "p" + field.COLUMN_NAME + "";
                    fields_update += field.COLUMN_NAME + "=p" + field.COLUMN_NAME + "";
                    parameters += "IN p" + field.COLUMN_NAME + " " +
                        field.DATA_TYPE.toUpperCase() + ((field.CHARACTER_MAXIMUM_LENGTH === null) ? "" : "(" + field.CHARACTER_MAXIMUM_LENGTH + ")");
                } else {
                    fields += field.COLUMN_NAME + ",";
                    if (index === 0) {
                        fields_input += "UUID(),";
                    } else {
                        parameters += "IN p" + field.COLUMN_NAME + " " +
                            field.DATA_TYPE.toUpperCase() + ((field.CHARACTER_MAXIMUM_LENGTH === null) ? "," : "(" + field.CHARACTER_MAXIMUM_LENGTH + "),");
                        fields_input += "p" + field.COLUMN_NAME + ",";
                        fields_update += field.COLUMN_NAME + "=p" + field.COLUMN_NAME + ",";
                    }
                }
            }

            let sp = CORE
                .replace("{{name}}", "sp_create_" + answers.name.toLowerCase())
                .replace("{{parameter}}", parameters)
                .replace("{{body}}", CREATE
                    .replace("{{table}}", answers.name)
                    .replace("{{parameters}}", fields)
                    .replace("{{parameters_insert}}", fields_input));

            sp += CORE
                .replace("{{name}}", "sp_search_" + answers.name.toLowerCase())
                .replace("{{parameter}}", "")
                .replace("{{body}}", SEARCH
                    .replace("{{table}}", answers.name)
                    .replace("{{parameters}}", fields));

            sp += CORE
                .replace("{{name}}", "sp_update_" + answers.name.toLowerCase())
                .replace("{{parameter}}", "IN puuid VARCHAR(36)," + parameters)
                .replace("{{body}}", UPDATE
                    .replace("{{table}}", answers.name)
                    .replace("{{parameters}}", fields_update));
            sp += CORE
                .replace("{{name}}", "sp_delete_" + answers.name.toLowerCase())
                .replace("{{parameter}}", "IN puuid VARCHAR(36)")
                .replace("{{body}}", DELETE
                    .replace("{{table}}", answers.name));
            fs.writeFileSync(path.join(currentDir, "sp_" + answers.name.toLowerCase() + ".sql"), sp);
        });
}