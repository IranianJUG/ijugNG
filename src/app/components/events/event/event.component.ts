import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Carousel } from 'primeng/carousel';
import * as L from 'leaflet';

import { FooterComponent } from '../../index/footer/footer.component';
import { HeaderComponent } from '../../index/header/header.component';
import { EventService } from '../../../services/event.service';
import { EventInterface } from '../../../interfaces/event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, Carousel, DatePipe],
})
export class EventComponent implements OnInit {
  @Input() slug!: string;
  event: EventInterface | undefined;
  eventLoc = { lat: 35.6895, lng: 51.389 };
  sanitizedDescription!: SafeHtml;

  galleryContent: any[] = [
    {
      content: `<div class="items-center justify-center gap-4">
                    <div class=" flex w-full items-center justify-center">
                        <img src="./imgs/img-1.jpg" alt="developer">
                    </div>
               </div>`,
    },
    {
      content: `<div class="items-center justify-center gap-4">
                    <div class=" flex w-full items-center justify-center">
                        <img src="./imgs/img-2.jpg"+""+ "alt="developer">
                    </div>
               </div>`,
    },
  ];

  constructor(
    private eventService: EventService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.eventService.getOne(this.slug).subscribe((response) => {
      this.event = response.data;
      if (this.event?.description) {
        this.sanitizedDescription = this.sanitizer.bypassSecurityTrustHtml(
          this.decodeHtml(this.event?.description)
        );
      }
    });

    const map = L.map('map').setView(
      [this.eventLoc.lat, this.eventLoc.lng],
      13
    );

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([this.eventLoc.lat, this.eventLoc.lng])
      .addTo(map)
      .bindPopup('مکان رویداد')
      .openPopup();
  }

  private decodeHtml(encodedStr: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = encodedStr;
    return textArea.value;
  }
}
