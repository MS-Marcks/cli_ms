import "../../utils/colors.js"
import { query } from '../../utils/query.js';

export async function command_check() {
    try {
        const q = await query("SELECT 1 AS connection");
        if (q.code !== 200) {
            console.log(red("NO SE LOGRO CONECTAR A LA BASE DE DATOS"));
        } else {
            console.log(green("SI SE LOGRO CONECTAR A LA BASE DE DATOS"));
        }
    } catch (error) {
        console.log(red("NO SE LOGRO CONECTAR A LA BASE DE DATOS"));
    }

}