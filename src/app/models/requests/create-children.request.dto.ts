export interface CreateChildrenRequestDto {
  name: string;
  birthday: Date;
  weight: number;
  height: number;
  consultationsId: Array<string>;
  vaccinesId: Array<string>;
}
