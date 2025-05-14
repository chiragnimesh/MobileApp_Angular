import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-mobilecarousel',
  imports: [CommonModule],
  templateUrl: './mobilecarousel.component.html',
  styleUrl: './mobilecarousel.component.scss',
})
export class MobilecarouselComponent implements OnInit, OnDestroy {
  images: { url: string; h1: string; p: string }[] = [
    {
      url: 'imgs/carousel3.jpg',
      h1: 'Latest Models',
      p: 'Check out the hottest models that everyone is raving about!',
    },
    {
      url: 'imgs/carousel4.jpg',
      h1: 'Trending Tech',
      p: 'Stay ahead with the latest tech trends and innovations!',
    },
    {
      url: 'imgs/carousel2.jpg',
      h1: 'User Reviews',
      p: 'Real users share their experience and opinions!',
    },
    {
      url: 'imgs/carousel6.jpg',
      h1: 'Price Comparisons',
      p: 'Find the best deals without breaking the bank!',
    },
  ];

  currentIndex = 0;
  intervalId: any;

  get visibleSlides() {
    const prev =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    const next = (this.currentIndex + 1) % this.images.length;
    return [
      { ...this.images[prev], index: prev + 1 },
      { ...this.images[this.currentIndex], index: this.currentIndex + 1 },
      { ...this.images[next], index: next + 1 },
    ];
  }

  getSlideClass(index: number): string {
    return ['prev', 'center', 'next'][index] || '';
  }

  ngOnInit() {
    this.startAutoSlide();
  }

  ngOnDestroy() {
    this.pause();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 2000);
  }

  pause() {
    clearInterval(this.intervalId);
  }

  resume() {
    this.startAutoSlide();
  }

  nextSlide() {
    this.pause();
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.resume();
  }

  prevSlide() {
    this.pause();
    this.currentIndex =
      (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.resume();
  }
}
