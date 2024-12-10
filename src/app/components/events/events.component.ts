import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../index/header/header.component";
import {FooterComponent} from "../index/footer/footer.component";
import {EventService} from "../../services/event.service";
import {EventInterface} from "../../interfaces/event";
import { environment } from '../../../environments/environment';
import {RouterLink} from "@angular/router";

const imagePrefix = environment.IMAGE_URL;

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss'
})
export class EventsComponent implements OnInit {
  events!: EventInterface[];
  constructor(private eventService:EventService) {
  }
  ngOnInit() {
    this.eventService.getAll().subscribe((data)=>{
      this.events=data.data
    })
  }
  protected readonly imagePrefix = imagePrefix;
}
