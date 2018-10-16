//Exportar valores necessários aos gŕaficos
export class Event {
  constructor(
    public name: string,
    public description: string,
    public beginning_date: string,
    public end_date: string,
    public photo?,
    public created_at?,
    public updated_at?
  ) {}
}
