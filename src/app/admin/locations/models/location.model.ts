//Exportar valores necessários aos gŕaficos
export class Location {
  constructor(
    public name: string,
    public postal_code: string,
    public adress_number: string,
    public full_adress: string,
    public district: string,
    public city: string,
    public state: string,
    public reference_point: string,
    public work_days: string,
    public open_hours: string,
    public close_hour: string,
    public manager_name: string,
    public manager_phone_number: string,
    public manager_email: string,
    public adress_complement: string,
    public updated_at?,
    public created_at?,
    public id?
  ) {}
}

export enum Profile {
  'ADMIN' = 0,
  'PUBLIC' = 1
}
