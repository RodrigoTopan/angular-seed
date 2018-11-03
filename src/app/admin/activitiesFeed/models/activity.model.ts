/*
ESTUDAR DEPOIS O QUE SÃO TYPES 
interface ActivityComplete {
  name: string;
  description: string;
  beginning_date: string;
  minimum_quorum: string;
  maximum_capacity: string;
  schedule_id: string; //Corresponde ao period
  event_id: string;
  location_id: string;
  room_id: string;
  created_at?;
  updated_at?;
  event?: Event;
  location?: Location;
  room?: Room;
  shedule?: Schedule;
}*/

//Exportar valores necessários aos gŕaficos
export class Activity {
  constructor(
    public name: string,
    public description: string,
    public beginning_date: string,
    public minimum_quorum: number,
    public maximum_capacity: number,
    public schedule_id: number, //Corresponde ao period
    public event_id: number,
    public location_id: number,
    public room_id: number,
    public created_at?,
    public updated_at?
  ) {}
}

export class Event {
  constructor(
    public name: string,
    public description: string,
    public beginning_date: string,
    public end_date: string,
    public id?,
    public photo?,
    public created_at?,
    public updated_at?
  ) {}
}

export class Location {
  constructor(
    public name: string,
    public full_adress: string,
    public adress_complement: string,
    public adress_number: string,
    public district: string,
    public city: string,
    public state: string,
    public postal_code: string,
    public reference_point: string,
    public work_days: string,
    public open_hours: string,
    public close_hour: string,
    public manager_name: string,
    public manager_phone_number: string,
    public manager_email: string,
    public id?,
    public photo?,
    public created_at?,
    public updated_at?
  ) {}
}

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

export class Schedule {
  constructor(
    public name: string,
    public begin_at: string,
    public finish_at: string,
    public id?,
    public created_at?,
    public updated_at?
  ) {}
}
