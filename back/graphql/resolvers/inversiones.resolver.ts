import { deleteInversion, getAllInversiones, getInversionById, saveInversion, updateInversion } from "../../controllers/inversiones"

export const inversionResolver = {
    Query: {
        inversiones: () => { return getAllInversiones() },
        inversion: (obj: any, params: any) => { return getInversionById(params.id) }
    },
    Mutation: {
        saveInversion: (obj: any, params: any) => {return saveInversion(params)},
        deleteInversion: (obj: any, params: any) => {return deleteInversion(params.id)},
        updateInversion: (obj: any, params: any) => {return updateInversion(params)},
    }
}