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

const imagePrefix = environment.IMAGE_URL;

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    HeaderComponent,
    NgOptimizedImage,
    Carousel,
    TranslateModule,
    FooterComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  animations: [
    trigger('slideInLeft', [
      transition(':enter', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-in', style({transform: 'translateX(0)'})),
      ]),
      transition(":leave", [
        animate('200ms ease-out', style({transform: 'translateX(-100%)'})),
      ])
    ])
  ],
})
export class IndexComponent implements OnInit {

  ourSponsors=[
    {
      name:"راهبرد هوشمند شهر",
      image:"./sponsors/smartcity.png",
      bg:"#fff"
    },{
      name:"داده پردازان ارتباط گستر ویونا",
      image:"./sponsors/viona.png",
      bg:"#fff"
    },{
      name:"ایران نیک",
      image:"./sponsors/irnic.png",
      bg:"#4745EE"
    },{
      name:"پژوهشگاه دانش های بنیادی",
      image:"./sponsors/ipm.png",
      bg:"#fff"
    },{
      name:"ایران نت",
      image:"./sponsors/iran-net.png",
      bg:"#4745EE"
    }
  ];

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '1199px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '767px',
      numVisible: 2,
      numScroll: 1
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
}
