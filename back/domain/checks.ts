export function isIngreso(params: any) {
    return 'concepto' in params && 'monto' in params && 'fecha' in params;
}
export function isGasto(params: any) {
    return 'concepto' in params && 'monto' in params && 'fecha' in params;
}
export function isInversion(params: any) {
    return 'concepto' in params && 'monto' in params && 'fecha' in params;
}
export function isGastoFijo(params: any) {
    return 'concepto' in params && 'monto' in params && 'fecha' in params;
}
export function isAhorro(params: any) {
    return 'monto' in params && 'fecha' in params;
}