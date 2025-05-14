import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChild,
  HostListener,
} from '@angular/core';


@Component({
  selector: 'app-test',
  imports: [CommonModule],
  templateUrl: './test.component.html',
  //  template: '<div id="react-root"></div>',
  styleUrl: './test.component.scss',
})
export class TestComponent implements AfterViewInit {
  @ViewChild('stickyLeft') stickyLeft!: ElementRef;
  @ViewChild('cardContainer') cardContainer!: ElementRef;

  cards = [
    {
      title: `Lightning Fast`,
      description: `Experience lightning-fast performance that makes your old phone feel like a snail. Say goodbye to lag and hello to smooth sailing!`,
      image: `imgs/pexels6.jpg`,
    },
    {
      title: `Sleek Designs`,
      description: `Our phones are not just smart; they’re fashion statements. Flaunt your style with devices that look as good as they perform!`,
      image: `imgs/pexels7.jpg`,
    },
    {
      title: `24/7 Support`,
      description: `Got questions? Our support team is here to help you at any hour. We don’t sleep, so you can!`,
      image: `imgs/pexels8.jpg`,
    },
  ];

  observer!: IntersectionObserver;

  ngAfterViewInit(): void {
    this.initObserver();
  }

  initObserver() {
    const section = this.stickyLeft.nativeElement.parentElement;

    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          section.classList.add('scroll-out');
        } else {
          section.classList.remove('scroll-out');
        }
      },
      {
        root: null,
        threshold: 0,
      }
    );

    this.observer.observe(this.cardContainer.nativeElement);
  }
}
