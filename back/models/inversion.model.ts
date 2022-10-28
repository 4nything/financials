import { GraphQLError } from 'graphql';
import { queryRun, queryAll } from '../db/db';
import { isInversion } from '../domain/checks';
import { Inversion } from '../intefaces/inversiones.interface';

export const InversionModel = {
    create: (params: any): Inversion => {
        try {
            if (!isInversion(params)) {
                throw new GraphQLError('Concepto, monto y fecha son requeridos');
            }
            const gasto = queryRun('INSERT INTO inversiones (concepto, monto, fecha) VALUES (?, ?, ?)', [params.concepto, params.monto, params.fecha]);
            return { ...params, id: gasto.lastInsertRowid };
        } catch (e) {
            throw e;
        }
    },
    get: (params?: any): Inversion | Inversion[] => {
        try {
            const rows = queryAll(`SELECT * FROM inversiones ${params ? `WHERE id = ${params.id}` : ''}`);
            return params ? rows[0] : rows;
        } catch (e) {
            throw e
        }
    },
    delete: (id: number | string): boolean => {
        try {
            const item = queryRun(`DELETE FROM inversiones WHERE id = ${id}`, []);
            if (!!!item.changes) {
                throw new GraphQLError('No existe un Inversion con ese ID');
            } 
            return !!item.changes;
        } catch (e) {
            throw e
        }
    },
    update: (params?: any): Inversion => {
        try {
            if (!isInversion(params) || !params.id) {
                throw new GraphQLError('ID, concepto, monto y fecha son requeridos');
            }
            queryRun(`UPDATE inversiones SET concepto = '${params.concepto}', monto = ${params.monto}, fecha = '${params.fecha}' WHERE id = ${params.id}`, []);
            return params;
        } catch (e) {
            throw e
        }
    }
}
