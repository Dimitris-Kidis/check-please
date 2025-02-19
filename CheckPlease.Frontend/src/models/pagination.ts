export interface PaginatorRequest {
  pageIndex: number;
  pageSize: number;
}

export interface PaginatorResult<T> {
  items: T[];
  hasMore: boolean;
  total: number;
}

export interface SearchPaginatedRequest {
  paginatedRequest: PaginatorRequest;
  date?: Date;
  searchInput?: string;
}
