import "../../utils/colors.js"
import { connect } from "../../utils/db.js";
import { query } from '../../utils/query.js';

export async function command_showTables() {
    try {
        const q = await query("SHOW TABLES;");
        if (q.code === 200) {
            console.log("Tablas")
            for (let index = 0; index < q.query.length; index++) {
                const table = q.query[index];
                console.log("-" + table["Tables_in_" + connect.database])
            }
            return;
        }
        console.log(red("NO SE LOGRO CONECTAR A LA BASE DE DATOS"));
    } catch (error) {
        console.log(red("NO SE LOGRO CONECTAR A LA BASE DE DATOS"));
    }

}