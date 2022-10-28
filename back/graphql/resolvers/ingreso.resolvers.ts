import { deleteIngreso, getAllIngresos, getIngresoById, saveIngreso, updateIngreso } from "../../controllers/ingresos";

export const ingresoResolver = {
    Query: {
        ingresos: () => { return getAllIngresos() },
        ingreso: (obj: any, params: any) => { return getIngresoById(params.id) }
    },
    Mutation: {
        saveIngreso: (obj: any, params: any) => {return saveIngreso(params)},
        deleteIngreso: (obj: any, params: any) => {return deleteIngreso(params.id)},
        updateIngreso: (obj: any, params: any) => {return updateIngreso(params)},
    }
}