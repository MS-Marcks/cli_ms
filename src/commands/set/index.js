import "../../utils/colors.js"
import inquirer from 'inquirer';
import jsonFormat from "json-format"
import path from "path";
import fs from "fs";
import url from 'url';
import { readJSONFileModule } from "../../utils/readJson.js";

const baseDir = path.join(path.dirname(url.fileURLToPath(import.meta.url)), "..", "..", "..", "profiles");

export function command_set_profile() {
    let profileFile = readJSONFileModule(path.join("profiles", "profile.json"));
    inquirer
        .prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Seleccione el perfil a usar:',
                choices: profileFile.profiles,
                validate: function (input) {
                    if (input) {
                        return true;
                    } else {
                        return 'Seleccione el perfil a usar';
                    }
                }
            }
        ])
        .then(answers => {
            const profile = profileFile.profile[answers.name.toLowerCase()];
            fs.writeFileSync(path.join(baseDir, "client.json"), jsonFormat(profile));
        });
}