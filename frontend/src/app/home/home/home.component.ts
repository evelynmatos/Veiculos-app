import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { EmblaCarouselDirective, EmblaCarouselType } from 'embla-carousel-angular';

@Component({
  selector: 'app-home',
  imports: [CommonModule, EmblaCarouselDirective],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit {

  @ViewChild(EmblaCarouselDirective) embla!: EmblaCarouselDirective;
  private emblaApi?: EmblaCarouselType;

  options = {
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
    slidesToScroll: 1
  } as any;

 slides = [
    { img: 'assets/images/vehicle-slide-1.jpg', title: 'Slide 1' },
    { img: 'assets/images/vehicle-slide-2.jpg', title: 'Slide 2' },
    { img: 'assets/images/vehicle-slide-3.jpg', title: 'Slide 3' },
  ];

 ngAfterViewInit() {
    setTimeout(() => {
      this.emblaApi = this.embla?.emblaApi;

      if (this.emblaApi) {
        setInterval(() => {
          this.emblaApi?.scrollNext();
        }, 4000);
      } else {
        console.warn('Embla API ainda não carregada.');
      }
    });
  }

  prev() {
    this.embla.scrollPrev();
  }

  next() {
    this.embla.scrollNext();
  }
}
