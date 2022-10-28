import sqlite3 from 'better-sqlite3';
import path from 'path';
const db = new sqlite3(path.resolve('financials.db'), { fileMustExist: true });

export function queryAll(sql: any) {
    return db.prepare(sql).all();
}

export function queryRun(sql: any, params: any) {
    return db.prepare(sql).run(params);
}
