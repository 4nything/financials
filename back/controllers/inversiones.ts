import { dateRange } from "../domain/utils";
import { InversionModel } from "../models/inversion.model";

export function getAllInversiones() {
    return InversionModel.get();
}

export function getDateRangeInversiones(params: any) {
    const inversiones = InversionModel.get();
    return dateRange(inversiones, params);
}

export function getInversionById(params: any) {
    return InversionModel.get(params);
}

export function saveInversion(params: any) {
    return InversionModel.create(params);
}

export function updateInversion(params: any) {
    return InversionModel.update(params);
}

export function deleteInversion(id: number | string) {
    return InversionModel.delete(id);
}