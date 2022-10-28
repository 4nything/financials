import { dateRange } from "../domain/utils";
import { GastoModel } from "../models/gasto.model";

export function getAllGastos() {
    return GastoModel.get();
}

export function getDateRangeGastos(params: any) {
    const gastos = GastoModel.get();
    return dateRange(gastos, params);
}

export function getGastoById(params: any) {
    return GastoModel.get(params);
}

export function saveGasto(params: any) {
    return GastoModel.create(params);
}

export function updateGasto(params: any) {
    return GastoModel.update(params);
}

export function deleteGasto(id: number | string) {
    return GastoModel.delete(id);
}