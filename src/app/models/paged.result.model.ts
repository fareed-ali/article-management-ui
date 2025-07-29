export interface PagedResult<T> {
  items: T[];
  totalCount: number;
  pageSize: number;
  pageNumber: number;
}