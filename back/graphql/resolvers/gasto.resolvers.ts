import { deleteGasto, getAllGastos, getGastoById, saveGasto, updateGasto } from "../../controllers/gastos"

export const gastoResolver = {
    Query: {
        gastos: () => { return getAllGastos() },
        gasto: (obj: any, params: any) => { return getGastoById(params.id) }
    },
    Mutation: {
        saveGasto: (obj: any, params: any) => { return saveGasto(params) },
        deleteGasto: (obj: any, params: any) => { return deleteGasto(params.id) },
        updateGasto: (obj: any, params: any) => { return updateGasto(params) },
    }
}