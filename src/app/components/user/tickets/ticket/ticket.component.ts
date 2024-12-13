import {Component, Input, OnInit} from '@angular/core';
import {TicketService} from "../../../../services/ticket.service";
import {TicketResponse} from "../../../../interfaces/ticket";

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss'
})
export class TicketComponent implements OnInit{
  @Input() id!: string;
  ticket!:TicketResponse;
  constructor(private ticketService:TicketService) {
  }

  ngOnInit() {
    console.log(this.id)
    this.ticketService.getTicket(parseInt(this.id)).subscribe(ticket => this.ticket = ticket)
  }
}
