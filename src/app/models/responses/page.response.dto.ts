import { PaginationResponseDto } from "./pagination.response.dto";

export interface PageResponseDto<T> {
  data: Array<T>;
  pagination: PaginationResponseDto;
}
