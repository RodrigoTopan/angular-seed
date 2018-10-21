export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private cpf: string,
    private full_adress: string,
    private adress_number: string,
    private district: string,
    private city: string,
    private state: string,
    private postal_code: string,
    private is_verified: string,
    private adress_complement?,
    private register_id?,
    private second_register_id?,
    private phone_number?,
    private available_whatsapp?,
    private linkedin?,
    private facebook?,
    private twitter?,
    private bond_id?,
    private role_id?,
    private created_at?,
    private updated_at?
  ) {}
}
