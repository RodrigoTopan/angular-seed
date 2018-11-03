//Exportar valores necessários aos gŕaficos
export class Speaker {
  constructor(
    public name: string,
    public type: string,
    public id?,
    public small_desc?,
    public linkedin?,
    public facebook?,
    public twitter?,
    public website?,
    public created_at?,
    public updated_at?
  ) {}
}
