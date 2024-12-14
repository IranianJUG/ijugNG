import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { EventInterface } from '../../interfaces/event';
import { environment } from '../../../environments/environment';
import { RouterLink } from '@angular/router';
import { PersianDatePipe } from '../../pipes/persian-date.pipe';

const imagePrefix = environment.IMAGE_URL;

@Component({
  selector: 'app-events',
  standalone: true,
  imports: [RouterLink, PersianDatePipe],
  templateUrl: './events.component.html',
  styleUrl: './events.component.scss',
})
export class EventsComponent implements OnInit {
  events!: EventInterface[];
  protected readonly imagePrefix = imagePrefix;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.eventService.getAll().subscribe((data) => {
      this.events = data.data;
    });
  }
}
