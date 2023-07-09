export const CORE = `

DELIMITER $$
CREATE PROCEDURE {{name}} ({{parameter}})
BEGIN
    {{body}}
END$$

`;
export const CREATE = `INSERT INTO {{table}}({{parameters}}) VALUES ({{parameters_insert}});`;
export const SEARCH = `SELECT {{parameters}} FROM {{table}};`;
export const UPDATE = `UPDATE {{table}} SET {{parameters}} WHERE uuid=puuid;`;
export const DELETE = `DELETE FROM {{table}} WHERE uuid=puuid;`;

export const GET_DATA_PARAMETERS =
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

