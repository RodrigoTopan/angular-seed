//Exportar valores necessários aos gŕaficos

export class Room {
  constructor(
    public name: string,
    public description: string,
    public capacity: string,
    public available_video_projector: string,
    public available_AC: string,
    public available_seats: string,
    public seats_type: string,
    public location_id: string,
    public id?,
    public created_at?,
    public updated_at?
  ) {}
}

export enum Profile {
  'ADMIN' = 0,
  'PUBLIC' = 1
}
