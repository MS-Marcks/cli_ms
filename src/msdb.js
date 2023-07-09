import { program } from 'commander';
import { readJSONFileModule } from "./utils/readJson.js";

import {
    command_version,
    command_create_profile,
    command_set_profile,
    command_check,
    command_showTables,
    command_procedures
} from './commands/index.js';

program.version(readJSONFileModule('package.json').version);

program
    .command('version')
    .description('Mostrar la versión del cliente')
    .action(command_version)

program
    .command('profile')
    .description('Crear un nuevo perfil de conexión a MySQL')
    .action(command_create_profile)

program
    .command('set')
    .description('Crear seleccionar un perfil de conexión a MySQL')
    .action(command_set_profile)

program
    .command('check')
    .description('Verificar la conexión a la base de datos')
    .action(command_check);

program
    .command('tables')
    .description('Listar las tablas de la base de datos')
    .action(command_showTables);

program
    .command('procedures')
    .description('Crear los procedimientos de creación, busqueda, actualizar y eliminar')
    .action(command_procedures);
/*program
    .command('create <arg>')
    .description('Crear el procedimiento de creación (Sintaxis: ./sp create <Nombre de la tabla>)')
    .action(command_create);

program
    .command('search <arg>')
    .description('Crear el procedimiento de busqueda')
    .action(command_search);

program
    .command('update <arg>')
    .description('Crear el procedimiento de actulizar')
    .action(command_update);

program
    .command('delete <arg>')
    .description('Crear el procedimiento de eliminar')
    .action(command_delete);

program
    .command('all <arg>')
    .description('Crear los procedimientos de creación, busqueda, actualizar y eliminar')
    .action(command_all);*/

program.parse(process.argv);