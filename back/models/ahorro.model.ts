import { GraphQLError } from 'graphql';
import { queryRun, queryAll } from '../db/db';
import { isAhorro } from '../domain/checks';
import { Ahorro } from '../intefaces/ahorro.interface';

export const AhorroModel = {
    create: (params: any): Ahorro => {
        try {
            if (!isAhorro(params)) {
                throw new GraphQLError('Monto y fecha son requeridos');
            }
            const gasto = queryRun('INSERT INTO ahorros (monto, fecha) VALUES (?, ?)', [params.monto, params.fecha]);
            return { ...params, id: gasto.lastInsertRowid };
        } catch (e) {
            throw e;
        }
    },
    get: (params?: any): Ahorro | Ahorro[] => {
        try {
            const rows = queryAll(`SELECT * FROM ahorros ${params ? `WHERE id = ${params.id}` : ''}`);
            return params ? rows[0] : rows;
        } catch (e) {
            throw e
        }
    },
    delete: (id: number | string): boolean => {
        try {
            const item = queryRun(`DELETE FROM ahorros WHERE id = ${id}`, []);
            if (!!!item.changes) {
                throw new GraphQLError('No existe un Ahorro con ese ID');
            } 
            return !!item.changes;
        } catch (e) {
            throw e
        }
    },
    update: (params?: any): Ahorro => {
        try {
            if (!isAhorro(params) || !params.id) {
                throw new GraphQLError('ID, concepto, monto y fecha son requeridos');
            }
            queryRun(`UPDATE ahorros SET monto = ${params.monto}, fecha = '${params.fecha}' WHERE id = ${params.id}`, []);
            return params;
        } catch (e) {
            throw e
        }
    }
}