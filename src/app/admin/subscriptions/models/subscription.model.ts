//Exportar valores necessários aos gŕaficos
export class Subscription {
  constructor(
    public name: string,
    public description: string,
    public beginning_date: string,
    public certificate?,
    public id?,
    public photo?,
    public created_at?,
    public updated_at?
  ) {}
}

export enum Profile {
  'ADMIN' = 0,
  'PUBLIC' = 1
}
