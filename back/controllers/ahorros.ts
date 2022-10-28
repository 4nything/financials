import { dateRange } from "../domain/utils";
import { Ahorro } from "../intefaces/ahorro.interface";
import { AhorroModel } from "../models/ahorro.model";

export function getAllAhorros() {
    return AhorroModel.get();
}

export function getDateRangeAhorros(params: any) {
    const ahorros = AhorroModel.get();
    return dateRange(ahorros, params);
}

export function getAhorroById(params: any) {
    return AhorroModel.get(params);
}

export function saveAhorro(params: any) {
    return AhorroModel.create(params);
}

export function updateAhorro(params: any) {
    return AhorroModel.update(params);
}

export function deleteAhorro(id: number | string) {
    return AhorroModel.delete(id);
}