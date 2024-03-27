export interface Pagination<T> {
    data(): Promise<T[]>;
    goto(pageIndex: number): Pagination<T>;
    pageIndex: number;
    pageCount: number;
    pageSize: number;
}
