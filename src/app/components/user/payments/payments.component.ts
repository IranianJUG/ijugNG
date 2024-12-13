import {Component, OnInit} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {PersianDatePipe} from "../../../pipes/persian-date.pipe";
import {TranslateModule} from "@ngx-translate/core";
import {PaymentService} from "../../../services/payment.service";
import {PaymentsResponse} from "../../../interfaces/payment";
import {Badge} from "primeng/badge";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-payments',
  standalone: true,
  imports: [
    PersianDatePipe,
    TranslateModule,
    Badge,
    NgClass
  ],
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.scss'
})
export class PaymentsComponent implements OnInit{
  payments!:PaymentsResponse
  constructor(private paymentService:PaymentService) {
  }
  ngOnInit() {
    this.paymentService.getPayments().subscribe(payments => {
      this.payments = payments;
    })
  }

  getSeverity(status: number) {
    switch (status) {
      case 1:
        return 'badge-success';
      default:
        return 'badge-info';
    }
  }
}
