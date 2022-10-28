import { dateRange } from "../domain/utils";
import { GastoFijoModel } from "../models/gasto-fijo.model";

export function getAllGastosFijos() {
    return GastoFijoModel.get();
}

export function getDateRangeGastosFijos(params: any) {
    const gastos = GastoFijoModel.get();
    return dateRange(gastos, params);
}

export function getGastoFijoById(params: any) {
    return GastoFijoModel.get(params);
}

export function saveGastoFijo(params: any) {
    return GastoFijoModel.create(params);
}

export function updateGastoFijo(params: any) {
    return GastoFijoModel.update(params);
}

export function deleteGastoFijo(id: number | string) {
    return GastoFijoModel.delete(id);
}