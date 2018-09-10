export class ShopSchema {
  static empty (): ShopSchema.Object {
    return {
      id: "",
      domain: "",
      accessToken: "",
      createdAt: 0,
      updatedAt: 0,
    };
  }
}

export namespace ShopSchema {
  export type Type = "info"|"success"|"warning";
  export interface Object {
    id: string;
    domain: string;
    accessToken: string;
    createdAt: number;
    updatedAt: number;
  }
}
