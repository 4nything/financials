import { deleteAhorro, getAhorroById, getAllAhorros, saveAhorro, updateAhorro } from "../../controllers/ahorros";

export const ahorroResolver = {
    Query: {
        ahorros: () => { return getAllAhorros() },
        ahorro: (obj: any, params: any) => { return getAhorroById(params.id) }
    },
    Mutation: {
        saveAhorro: (obj: any, params: any) => { return saveAhorro(params) },
        deleteAhorro: (obj: any, params: any) => { return deleteAhorro(params.id) },
        updateAhorro: (obj: any, params: any) => { return updateAhorro(params) },
    }
}