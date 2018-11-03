//Exportar valores necessários aos gŕaficos
export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public cpf: string,
    public full_adress: string,
    public adress_number: string,
    public district: string,
    public city: string,
    public state: string,
    public postal_code: string,
    public bond_id: string,
    public id?,
    public register_id?,
    public second_register_id?,
    public adress_complement?,
    public phone_number?,
    public available_whatsapp?,
    public linkedin?,
    public facebook?,
    public twitter?,
    public role_id?,
    public remember_token?,
    public created_at?,
    public updated_at?,
    public is_verified?
  ) {}
}

export enum Profile {
  'ADMIN' = 0,
  'PUBLIC' = 1
}
