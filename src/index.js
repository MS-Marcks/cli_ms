const program = require('commander');
const { version } = require('../package.json');

const {
    command_version,
    command_create_project,
    /*command_check,
    command_list_table,
    command_create,
    command_search,
    command_update,
    command_delete,
    command_all*/
} = require('./commands');

program.version(version);

program
    .command('version')
    .description('Mostrar la versión del cliente')
    .action(command_version)

program
    .command('new <arg>')
    .description('Crear un nuevo proyecto')
    .action(command_create_project)

/*program
    .command('check')
    .description('Verificar la conexión a la base de datos')
    .action(command_check);

program
    .command('tables')
    .description('Listar las tablas de la base de datos')
    .action(command_list_table);

program
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
