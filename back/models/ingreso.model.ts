import { GraphQLError } from "graphql";
import { queryRun, queryAll } from "../db/db";
import { isIngreso } from "../domain/checks";
import { Ingreso } from "../intefaces/ingreso.interface";

export const IngresoModel = {
    create: (params: any): Ingreso => {
        try {
            if (!isIngreso(params)) {
                throw new GraphQLError('Concepto, monto y fecha son requeridos');
            }
            const gasto = queryRun('INSERT INTO ingresos (concepto, monto, fecha) VALUES (?, ?, ?)', [params.concepto, params.monto, params.fecha]);
            return { ...params, id: gasto.lastInsertRowid };
        } catch (e) {
            throw e;
        }
    },
    get: (params?: any): Ingreso | Ingreso[] => {
        try {
            const rows = queryAll(`SELECT * FROM ingresos ${params ? `WHERE id = ${params.id}` : ''}`);
            return params ? rows[0] : rows;
        } catch (e) {
            throw e
        }
    },
    delete: (id: number | string): boolean => {
        try {
            const item = queryRun(`DELETE FROM ingresos WHERE id = ${id}`, []);
            if (!!!item.changes) {
                throw new GraphQLError('No existe un Ingreso con ese ID');
            } 
            return !!item.changes;
        } catch (e) {
            throw e
        }
    },
    update: (params?: any): Ingreso => {
        try {
            if (!isIngreso(params) || !params.id) {
                throw new GraphQLError('ID, concepto, monto y fecha son requeridos');
            }
            queryRun(`UPDATE ingresos SET concepto = '${params.concepto}', monto = ${params.monto}, fecha = '${params.fecha}' WHERE id = ${params.id}`, []);
            return params;
        } catch (e) {
            throw e
        }
    }
}
