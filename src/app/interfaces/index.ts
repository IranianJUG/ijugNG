import {Topic} from "./topic";
import {Instructor} from "./instructor";
import {Sponsor} from "./sponsor";

export interface IndexResponse {
  success: boolean;
  data: Index;
}

export interface Index {
  sliders:Slider[];
  recentEvents:Event[];
  topics:Topic[];
  instructors:Instructor[];
  sponsors:Sponsor[];
  ticketCount:false|number;
  eventsCount:false|number;
  usersCount:false|number;
}


export interface Slider {
  image:string;
  title:string;
  description:string;
  link:string;
}
