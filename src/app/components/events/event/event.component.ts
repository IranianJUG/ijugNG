import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { Carousel } from 'primeng/carousel';
import * as L from 'leaflet';

import { FooterComponent } from '../../index/footer/footer.component';
import { HeaderComponent } from '../../index/header/header.component';
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
  imports: [FooterComponent, HeaderComponent, Carousel, PersianDatePipe],
})
export class EventComponent implements OnInit {
  @Input() slug!: string;
  protected readonly imagePrefix = imagePrefix;
  event: EventInterface | undefined;
  safeDescription: SafeHtml | undefined;

  galleryContent: any[] = [];

  constructor(
    private eventService: EventService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.eventService.getOne(this.slug).subscribe((response) => {
      this.event = response.data;

      this.descriptionModifier();
      this.loadGallery();
      this.getLocation();
    });
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
                          <img src="${this.imagePrefix}/path/to/gallery/${image}" alt="Gallery image" class="w-full h-auto rounded-lg">
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
}
