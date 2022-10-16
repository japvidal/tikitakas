import { AfterViewInit, Component } from '@angular/core';
import Swiper,{
  Autoplay,
  EffectFade,
  Pagination,
  Navigation,
  Scrollbar
} from 'swiper';

Swiper.use([Autoplay,EffectFade, Pagination, Navigation,Scrollbar]);

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit  {
  
  mySwiper: Swiper;

  imagenes : string[];

 
  constructor() { 
    this.mySwiper = new Swiper('.swiper-container', {   });
    this.imagenes=[];
    this.imagenes.push('../../assets/images/slide/homepic1.jpg');
    this.imagenes.push('../../assets/images/slide/homepic3.jpg');
    this.imagenes.push('../../assets/images/slide/homepic4.jpg');
    this.imagenes.push('../../assets/images/slide/homepic6.jpg');

  }

  ngAfterViewInit(): void {
    this.mySwiper = new Swiper('.swiper-container', {
      slidesPerView: 'auto',
      runCallbacksOnInit: true,
      loop: true,
      loopPreventsSlide: true,
      spaceBetween: 0,
      speed: 2000,
      pagination: {
        el: '.swiper-pagination',
        clickable: false,
      },
      autoplay: {
        delay: 10000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
      }
    });

  }


  onSlideNext(){
    this.mySwiper.slideNext();
  }

  onSlidePrev(){
    this.mySwiper.slidePrev();
  }


}
