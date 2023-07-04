require('./colors');
const figlet = require('figlet');

const banner = (msn) => {
    console.log();
    console.log(blue(figlet.textSync(msn, {
        font: 'ANSI Shadow',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    })));
}

module.exports = banner;