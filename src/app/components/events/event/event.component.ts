import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Carousel } from 'primeng/carousel';
import * as L from 'leaflet';

import { EventService } from '../../../services/event.service';
import { EventInterface } from '../../../interfaces/event';
import { PersianDatePipe } from '../../../pipes/persian-date.pipe';
import { environment } from '../../../../environments/environment';

const imagePrefix = environment.IMAGE_URL;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
  standalone: true,
  imports: [Carousel, PersianDatePipe],
})
export class EventComponent implements OnInit {
  @Input() slug!: string;
  protected readonly imagePrefix = imagePrefix;
  event: EventInterface | undefined;
  safeDescription: SafeHtml | undefined;
  remainCountMessage: string = '';
  priceMessage: string = '';
  isBuyButtonDisabled: boolean = false;
  galleryContent: any[] = [];

  constructor(
    private eventService: EventService,
    private sanitizer: DomSanitizer,
    private httpClient: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.eventService.getOne(this.slug).subscribe((response) => {
      this.event = response.data;

      this.isBuyButtonDisabled =
        this.event?.remain_count === 0 || this.event?.price == null;

      this.setMessages();
      this.descriptionModifier();
      this.loadGallery();
      this.getLocation();
    });
  }

  protected isEventExpired(eventTime: string): boolean {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];
    const eventDate = new Date(eventTime.split(' ')[0]);

    return eventDate <= new Date(todayString);
  }

  protected purchase(eventId: number): void {
    this.httpClient
      .get(`https://api.awscloud.ir/api/smartis/event/${eventId}/1`)
      .subscribe((response: any) => {
        if (response.success) {
          if (response.data.pay_status == false) {
            this.redirectToPaymentPage(response.data.payment_id);
          } else {
            alert('خرید با موفقیت انجام شد.');
          }
        } else if (response.message) {
          alert(response.message);
        } else {
          alert('خرید ناموفق بود. لطفا دوباره تلاش کنید.');
        }
      });
  }

  private redirectToPaymentPage(paymentId: string): void {
    window.location.replace('https://wallet.smartispay.app/' + paymentId);
    // const url = `https://wallet.smartispay.app/${paymentId}`;
    // this.router.navigateByUrl(url);
  }

  private setMessages(): void {
    this.remainCountMessage =
      'ظرفیت: ' +
      (this.event?.remain_count === -1
        ? 'نامحدود'
        : this.event?.remain_count === 0
        ? 'ظرفیت تکمیل'
        : this.event?.remain_count?.toString());

    this.priceMessage =
      'قیمت: ' +
      (this.event?.price == 0
        ? 'رایگان'
        : this.event?.price != null
        ? this.formatCurrency(this.event.price, 'IRR')
        : '');
  }

  private descriptionModifier(): void {
    this.safeDescription = this.sanitizer.bypassSecurityTrustHtml(
      this.event?.description || ''
    );
  }

  private loadGallery(): void {
    if (this.event?.gallery && this.event.gallery.length > 0) {
      this.galleryContent = this.event.gallery.map((image) => {
        return {
          content: `<div class="items-center justify-center gap-4">
                      <div class=" flex w-full items-center justify-center">
                          <img src="${this.imagePrefix}/${image}" alt="Gallery image" class="w-full h[100%] rounded-lg">
                      </div>
                    </div>`,
        };
      });
    } else {
      this.galleryContent = [
        {
          content: `<div class="items-center justify-center gap-4">
                    <div class=" flex w-full items-center justify-center">
                        <img src="default-image.jpg" alt="Default Image" class="w-full h-auto rounded-lg">
                    </div>
                  </div>`,
        },
      ];
    }
  }

  private getLocation(): void {
    const lat = this.event?.location_lat
      ? parseFloat(this.event.location_lat)
      : 0;
    const lng = this.event?.location_lng
      ? parseFloat(this.event.location_lng)
      : 0;
    const locName = this.event?.location_name
      ? this.event?.location_name
      : 'مکان رویداد';

    const map = L.map('map').setView([lat, lng], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([lat, lng]).addTo(map).bindPopup(locName).openPopup();
  }

  private formatCurrency(amount: number, currencyCode: string = 'IRR'): string {
    return new Intl.NumberFormat('fa-IR', {
      style: 'currency',
      currency: currencyCode,
    }).format(amount);
  }
}
