import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TicketService } from '../../../../services/ticket.service';
import { Ticket, TicketResponse } from '../../../../interfaces/ticket';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
})
export class TicketComponent implements OnInit {
  ticket: Ticket | null = null;

  constructor(
    private ticketService: TicketService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const ticketId = +this.route.snapshot.paramMap.get('id')!; // Get ticket ID from URL
    this.getTicketDetails(ticketId);
  }

  getTicketDetails(id: number): void {
    this.ticketService.getTicket(id).subscribe((ticket: TicketResponse) => {
      this.ticket = ticket.data;
    });
  }
}
