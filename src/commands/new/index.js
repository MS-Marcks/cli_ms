import "../../utils/colors.js"
import inquirer from 'inquirer';
import path from "path";
import fs from "fs";
import { exec } from 'child_process';

import { readFile } from "../../utils/readJson.js";

const baseDir = path.resolve(".");

export function command_create_project() {
    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'Ingrese nombre del projecto:',
                validate: function (input) {
                    if (input) {
                        return true;
                    } else {
                        return 'Ingrese un nombre para el proyecto.';
                    }
                }
            },
            {
                type: 'list',
                name: 'engine',
                message: 'Seleccione un motor de base de datos:',
                choices: ['mysql', 'sqlserver', 'mariadb', 'sqlite'],
                validate: function (input) {
                    if (input) {
                        return true;
                    } else {
                        return 'Seleccione un motor de base de datos';
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
            const root = path.join(baseDir, answers.name);
            const config = path.join(root, "config");
            const scripts = path.join(root, "config", "scripts");
            if (fs.existsSync(root)) {
                console.log(`\n${red("Ya existe el proyecto")}`)
                return;
            }
            fs.mkdirSync(root);
            const package_file = readFile("src/templates/package.template").replace("{{name}}", answers.name);
            const config_file = readFile("src/templates/config.template")
                .replace("{{engine}}", answers.engine)
                .replace("{{server}}", answers.server)
                .replace("{{database}}", answers.database)
                .replace("{{user}}", answers.user)
                .replace("{{password}}", answers.password)
                .replace("{{port}}", answers.port);

            const cli_file = readFile("src/templates/config/scripts/cli." + answers.engine + ".db.template")
            const engine_file = readFile("src/templates/config/scripts/" + answers.engine + ".template");
            const db_file = readFile("src/templates/config/db.template");
            const gitignore_file = readFile("src/templates/gitignore.template");
            
            fs.mkdirSync(config);
            fs.mkdirSync(scripts);
            fs.writeFileSync(path.join(root, "package.json"), package_file, { encoding: "utf-8" });
            fs.writeFileSync(path.join(root, "config.json"), config_file, { encoding: "utf-8" });
            fs.writeFileSync(path.join(root, ".gitignore"), gitignore_file, { encoding: "utf-8" });
            
            fs.writeFileSync(path.join(config, "db.js"), db_file, { encoding: "utf-8" });
            fs.writeFileSync(path.join(scripts, "cli." + answers.engine + ".db.js"), cli_file, { encoding: "utf-8" });
            fs.writeFileSync(path.join(scripts, answers.engine + ".js"), engine_file, { encoding: "utf-8" });
            const comando = `cd ${root} && npm install`;
            exec(comando, (error, stdout, stderr) => {
                if (error) {
                    console.error(`${error.message}`);
                    return;
                }
                if (stderr) {
                    console.error(`${stderr}`);
                    return;
                }
                console.log(`\n${stdout}`);
            });
        });
}