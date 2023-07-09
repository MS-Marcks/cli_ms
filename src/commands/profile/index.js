import "../../utils/colors.js"
import inquirer from 'inquirer';
import jsonFormat from "json-format"
import path from "path";
import fs from "fs";
import url from 'url';
import { readJSONFileModule } from "../../utils/readJson.js";
//import { readFile } from "../../utils/readJson.js";

const baseDir = path.join(path.dirname(url.fileURLToPath(import.meta.url)), "..", "..", "..", "profiles");

export function command_create_profile() {
    let profileFile = readJSONFileModule(path.join("profiles", "profile.json"));
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Ingrese un nombre para el perfil:',
                validate: function (input) {
                    if (input) {
                        if (typeof profileFile.profile[input.toLowerCase()] !== "undefined") {
                            return 'El perfil ya existe';
                        }
                        return true;
                    } else {
                        return 'Ingrese un nombre para el perfil';
                    }
                }
            },
            {
                type: 'input',
                name: 'server',
                message: 'Ingrese el servidor de la base de datos:',
                validate: function (input) {
                    if (input) {
                        return true;
                    } else {
                        return 'Ingrese el servidor de la base de datos.';
                    }
                }
            },
            {
                type: 'input',
                name: 'user',
                message: 'Ingrese el cliente de la base de datos:',
                validate: function (input) {
                    if (input) {
                        return true;
                    } else {
                        return 'Ingrese el cliente de la base de datos.';
                    }
                }
            },
            {
                type: 'input',
                name: 'database',
                message: 'Ingrese el nombre de la base de datos:',
                validate: function (input) {
                    if (input) {
                        return true;
                    } else {
                        return 'Ingrese el nombre de la base de datos.';
                    }
                }
            },
            {
                type: 'input',
                name: 'password',
                message: 'Ingrese la contraseña de la base de datos:'
            },
            {
                type: 'input',
                name: 'port',
                message: 'Ingrese el puerto de la base de datos:'
            },
        ])
        .then(answers => {
            profileFile.profiles.push(answers.name.toLowerCase());
            Object.assign(profileFile.profile, JSON.parse(`
            {
                "${answers.name.toLowerCase()}":{
                    "server": "${answers.server}",
                    "database":"${answers.database}",
                    "user":"${answers.user}",
                    "password":"${answers.password}",
                    "port":"${answers.port}"
                }
            }
            `));
            fs.writeFileSync(path.join(baseDir, "profile.json"), jsonFormat(profileFile));

        });
}