'use strict';
import mysql from 'promise-mysql';
import { connect } from "./db.js";

export const query = async (sp, body = null) => {
    try {
        const connection = await mysql.createConnection(connect);
        try {
            await connection.beginTransaction();
            const query = (body === null) ? await connection.query(sp) : await connection.query(sp, body);
            await connection.commit(); await connection.end();
            return { code: 200, query: query };
        } catch (err) {
            await connection.rollback(); await connection.end();
            return { code: 404, err: err };
        }
    } catch (err) {
        return { code: 404, err: err };
    }
}
