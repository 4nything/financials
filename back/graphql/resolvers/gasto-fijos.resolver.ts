import { deleteGastoFijo, getAllGastosFijos, getGastoFijoById, saveGastoFijo, updateGastoFijo } from "../../controllers/gastos-fijos"

export const gastoFijoResolver = {
    Query: {
        gastosFijos: () => { return getAllGastosFijos() },
        gastoFijo: (obj: any, params: any) => { return getGastoFijoById(params.id) }
    },
    Mutation: {
        saveGastoFijo: (obj: any, params: any) => {return saveGastoFijo(params)},
        deleteGastoFijo: (obj: any, params: any) => {return deleteGastoFijo(params.id)},
        updateGastoFijo: (obj: any, params: any) => {return updateGastoFijo(params)},
    }
}