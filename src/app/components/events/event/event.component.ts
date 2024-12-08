import {Component, Input, OnInit} from '@angular/core';
import {FooterComponent} from "../../index/footer/footer.component";
import {HeaderComponent} from "../../index/header/header.component";
import {EventService} from "../../../services/event.service";
import {EventInterface} from "../../../interfaces/event";

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [
    FooterComponent,
    HeaderComponent
  ],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent implements OnInit {
    @Input() slug!: string
    event : EventInterface | undefined

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
      console.log(this.slug)
      this.eventService.getOne(this.slug).subscribe((response)=>{
        this.event = response.data
      })
    }
}
