export function dateRange(data: any, params: any) {
    return data.filter((item: any) => new Date(item.fecha).getTime() > new Date(params.from).getTime()
        && new Date(item.fecha).getTime() < new Date(params.to).getTime())
}