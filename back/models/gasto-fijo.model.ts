import { GraphQLError } from 'graphql';
import { queryRun, queryAll } from '../db/db';
import { isGastoFijo } from '../domain/checks';
import { GastoFijo } from '../intefaces/gasto-fijo.inteface';

export const GastoFijoModel = {
    create: (params: any): GastoFijo => {
        try {
            if (!isGastoFijo(params)) {
                throw new GraphQLError('Concepto, monto y fecha son requeridos');
            }
            const gasto = queryRun('INSERT INTO gastosFijos (concepto, monto, fecha) VALUES (?, ?, ?)', [params.concepto, params.monto, params.fecha]);
            return { ...params, id: gasto.lastInsertRowid };
        } catch (e) {
            throw e;
        }
    },
    get: (params?: any): GastoFijo | GastoFijo[] => {
        try {
            const rows = queryAll(`SELECT * FROM gastosFijos ${params ? `WHERE id = ${params.id}` : ''}`);
            return params ? rows[0] : rows;
        } catch (e) {
            throw e
        }
    },
    delete: (id: number | string): boolean => {
        try {
            const item = queryRun(`DELETE FROM gastosFijos WHERE id = ${id}`, []);
            if (!!!item.changes) {
                throw new GraphQLError('No existe un Gasto Fijo con ese ID');
            } 
            return !!item.changes;
        } catch (e) {
            throw e
        }
    },
    update: (params?: any): GastoFijo => {
        try {
            if (!isGastoFijo(params) || !params.id) {
                throw new GraphQLError('ID, concepto, monto y fecha son requeridos');
            }
            queryRun(`UPDATE gastosFijos SET concepto = '${params.concepto}', monto = ${params.monto}, fecha = '${params.fecha}' WHERE id = ${params.id}`, []);
            return params;
        } catch (e) {
            throw e
        }
    }
}