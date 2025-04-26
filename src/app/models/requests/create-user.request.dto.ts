import { Kind } from "../enums/kind.enum";

export interface CreateUserRequestDto {
  email: string;
  password: string;
  name: string;
  childrenNumber: number;
  kind: Kind;
}
