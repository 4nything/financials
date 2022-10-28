import { GraphQLError } from "graphql";
import { dateRange } from "../domain/utils";
import { IngresoModel } from "../models/ingreso.model";

export function getAllIngresos() {
    return IngresoModel.get();
}

export function getDateRangeIngresos(params: any) {
    const ingresos = IngresoModel.get();
    return dateRange(ingresos, params);
}

export function getIngresoById(params: any) {
    return IngresoModel.get(params);
}

export function saveIngreso(params: any) {
    return IngresoModel.create(params);
}

export function updateIngreso(params: any) {
    return IngresoModel.update(params);
}

export function deleteIngreso(id: number | string) {
    return IngresoModel.delete(id);
}