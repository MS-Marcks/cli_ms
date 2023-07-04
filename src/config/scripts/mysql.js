const CORE = `
DELIMITER $$
CREATE PROCEDURE {{name}} ({{parameter}})
BEGIN
    {{body}}
END$$
`;
const CREATE = `INSERT INTO {{table}}({{parameters}}) VALUES ({{parameters_insert}})`;
const SEARCH = `SELECT {{parameters}} FROM {{table}}`;
const UPDATE = `UPDATE {{table}} SET {{parameters_insert}} WHERE {{conditional}}`;
const DELETE = `DELETE FROM {{table}} WHERE {{conditional}}`;

const GET_DATA_PARAMETERS =
    `SELECT 
    COLUMN_NAME, 
    DATA_TYPE, 
    CHARACTER_MAXIMUM_LENGTH, 
    IS_NULLABLE, 
    COLUMN_DEFAULT, 
    COLUMN_KEY, 
    EXTRA, 
    COLUMN_COMMENT 
FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = '{{database}}' AND TABLE_NAME = '{{table}}';`

const GET_LIST_TABLES = `SHOW TABLES`;

module.exports = {
    GET_LIST_TABLES
}