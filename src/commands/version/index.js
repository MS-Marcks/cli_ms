const { version } = require("../../../package.json");
const banner = require("../../utils/banner");

async function command_version() {
    console.log("");
    banner("MS DB");
    console.log(`
    MS DB CLI: ${version}
    Node: ${process.version}
    `);
}

module.exports = command_version;