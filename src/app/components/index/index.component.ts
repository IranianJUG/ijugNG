import {Component} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {animate, style, transition, trigger} from "@angular/animations";
import {NgOptimizedImage} from "@angular/common";
import {Carousel} from "primeng/carousel";
import {TranslateModule} from "@ngx-translate/core";
import {FooterComponent} from "./footer/footer.component";

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
export class IndexComponent {

  sliderContent: any = [
    {
      content: `<div class="items-center justify-center gap-4">
                    <div class=" flex w-full items-center justify-center">
                        <img src="./imgs/img-1.jpg" alt="developer">
                    </div>
               </div>`
    },
    {
      content: `<div class="items-center justify-center gap-4">
                    <div class=" flex w-full items-center justify-center">
                        <img src="./imgs/img-2.jpg" alt="developer">
                    </div>
               </div>`
    }
  ]
  sliderIndex: number = 0
  recentEvents = ['هفدهمین رویداد تهران جاگ','شانزدهمین رویداد تهران جاگ','جشن روز برنامه نویس','جلسه پانزدهم تهران جاگ','جلسه چهاردهم تهران جاگ']
  popularCategory= [
    'Javascript','TypeScript','JAVA','OracleDB','Java 23',';)'
  ]

  recentInstructor=[
    {
      name:"مجید مصطفوی",
      title:"Experienced Java Developer and JUG Leader with a strong" +
        " background in building efficient, high-performance software solutions. Committed to community engagement and professional development." ,
      image:"https://ijug.ir/team/Majid-1.jpg",
    },
    {
      name:"حسام غیاصی",
      title:"Software Engineer | Specializing in Java, Spring, Hibernate," +
        " software architecture, TDD, DDD and agile | Leading development teams to higher quality and better productivity | Lifelong researcher and learner",
      image:"https://ijug.ir/team/Hesam.jpg",
    },
    {
      name:"فرناز مثیمی",
      title:"Java Developer",
      image:"https://ijug.ir/team/Farnaz.png",
    },
    {
      name:"امین بازگیر",
      title:"Java Developer",
      image:"https://ijug.ir/team/AminB.jpg",
    },
    {
      name:"امیررضا رضائیان",
      title:"Java Developer",
      image:"https://ijug.ir/team/AmirReza.jpg",
    }
  ]

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

  prevSlide() {
    console.log('prev', this.sliderIndex)

    if (this.sliderIndex > 0) {
      this.sliderIndex -= 1
    }
  }

  nextSlide() {
    console.log('next', this.sliderIndex)
    if (this.sliderIndex < this.sliderContent.length - 1) {
      this.sliderIndex += 1
    }
  }

}
