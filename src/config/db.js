'use strict';
const path = require("path");
const fs = require("fs");
const baseDir = path.resolve(".");
//const config = require(path.join(baseDir, "config.json"));
const config = require("../../config.json");

let Connect;
if (config.database.engine === "mysql") {
    Connect = {
        host: config.database.client.server,
        user: config.database.client.user,
        password: config.database.client.password,
        database: config.database.client.database,
        port: (config.database.client.port === undefined) ? 3306 : config.database.client.port,
        multipleStatements: true
    }
}

module.exports = Connect;