
import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {animate, style, transition, trigger} from "@angular/animations";
import {NgOptimizedImage} from "@angular/common";
import {Carousel} from "primeng/carousel";
import {TranslateModule} from "@ngx-translate/core";
import {FooterComponent} from "./footer/footer.component";
import {IndexService} from "../../services/index.service";
import {Index} from "../../interfaces";
import { environment } from '../../../environments/environment';
import {PersianDatePipe} from "../../pipes/persian-date.pipe";
import {RouterLink} from "@angular/router";

const imagePrefix = environment.IMAGE_URL;
const sliderPrefix = environment.PUBLIC_URL;

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    Carousel,
    TranslateModule,
    PersianDatePipe,
    RouterLink,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-out', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
  ],
})

export class IndexComponent implements OnInit {

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1,
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1,
    },
    {
      breakpoint: '575px',
      numVisible: 1,

      numScroll: 1
    }
  ]
  indexData!:Index

  constructor(private indexService:IndexService) {
  }
  ngOnInit(){
    this.indexService.getIndexData().subscribe((data)=>{
      this.indexData = data.data
    })
  }

  protected readonly imagePrefix = imagePrefix;
  protected readonly sliderPrefix = sliderPrefix;
}
