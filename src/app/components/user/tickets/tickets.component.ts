import {Component, OnInit} from '@angular/core';
import {TranslateModule} from "@ngx-translate/core";
import {TicketService} from "../../../services/ticket.service";
import {TicketResponse, TicketsResponse} from "../../../interfaces/ticket";
import {TableModule} from "primeng/table";
import {PersianDatePipe} from "../../../pipes/persian-date.pipe";
import {faCircleInfo} from '@fortawesome/free-solid-svg-icons';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {RouterLink} from "@angular/router";


@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [
    TranslateModule,
    TableModule,
    PersianDatePipe,
    FaIconComponent,
    RouterLink
  ],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss'
})
export class TicketsComponent implements OnInit{
  tickets!:TicketsResponse
  constructor(private ticketService:TicketService) {
  }
  ngOnInit() {
    this.ticketService.getTickets().subscribe(tickets => {
      this.tickets = tickets;
    })
  }
  protected readonly faCircleInfo = faCircleInfo;
}
