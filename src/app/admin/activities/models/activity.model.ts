//Exportar valores necessários aos gŕaficos
export class Activity {
  constructor(
    public name: string,
    public description: string,
    public beginning_date: string,
    public minimum_quorum: string,
    public maximum_capacity: string,
    public schedule_id: string, //Corresponde ao period
    public event_id: string,
    public location_id: string,
    public room_id: string
  ) {}
}
