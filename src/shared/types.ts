export interface UserDetail {
  firstName: string;
  lastName: string;
  phone: number;
  corporationNumber: string;
}

export type CorporationNumberResponse =
  | {
      corporationNumber: string;
      valid: true;
    }
  | ({
      valid: false;
    } & ResponseError);

export type ResponseError = {
  message: string;
};
