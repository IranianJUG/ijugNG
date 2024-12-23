export interface EventInterface {
  id: number;
  name: string;
  slug: string;
  thumbnail?: string;
  image: string;
  gallery?: string[];
  description?: string;
  tags?: string[];
  total_count?: number;
  remain_count?: number;
  short_description?: string;
  event_time: string;
  location_name?: string;
  location_address?: string;
  location_lat?: string;
  location_lng?: string;
  price?: number;
  created_at?: string;
  updated_at?: number;
  hasTicket?: boolean;
}

export interface EventResponseInterface {
  success: boolean;
  data?: EventInterface;
}

export interface EventsResponseInterface {
  success: boolean;
  data: EventInterface[];
}
