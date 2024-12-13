import {EventInterface} from "./event";

export interface Ticket {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  user_id: number;
  event_id: number;
  created_at: string;
  updated_at: string;
  used: number;
  event: EventInterface;
}


export interface TicketsResponse {
  success: boolean;
  data: Ticket[];
}
export interface TicketResponse {
  success: boolean;
  data: Ticket;
}
