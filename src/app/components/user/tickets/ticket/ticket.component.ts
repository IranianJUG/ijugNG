import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { jsPDF } from 'jspdf';

import { TicketService } from '../../../../services/ticket.service';
import { Ticket, TicketResponse } from '../../../../interfaces/ticket';
import { PersianDatePipe } from '../../../../pipes/persian-date.pipe';

@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
  standalone: true,
  imports: [PersianDatePipe],
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

  // protected downloadPDF() {
  //   const doc = new jsPDF({
  //     unit: 'mm',
  //     format: 'a5',
  //     orientation: 'portrait',
  //   });

  //   const content = document.getElementById('ticket-content');

  //   if (content) {
  //     doc.html(content, {
  //       callback: function (doc) {
  //         doc.save('ticket.pdf');
  //         doc.
  //       },
  //       margin: [10, 10, 10, 10],
  //       x: 10,
  //       y: 10,
  //     });
  //   }
  // }

  private getTicketDetails(id: number): void {
    this.ticketService.getTicket(id).subscribe((ticket: TicketResponse) => {
      this.ticket = ticket.data;
    });
  }
}
