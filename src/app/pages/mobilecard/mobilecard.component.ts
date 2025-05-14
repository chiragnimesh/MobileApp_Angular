import { Component, inject, Input, signal } from '@angular/core';
import { lastValueFrom, Subscription } from 'rxjs';
import { MobileService } from '../../services/mobile.service';
import { Mobile } from '../../interfaces/mobile';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { TiltDirective } from '../../directives/tilt.directive';
import { HttpClient } from '@angular/common/http';
import { TestComponent } from "../test/test.component";
import { MapComponent } from "../map/map.component";
import { MobilecarouselComponent } from "../mobilecarousel/mobilecarousel.component";

@Component({
  selector: 'app-mobilecard',
  imports: [
    CurrencyPipe,
    CommonModule,
    TiltDirective,
    TestComponent,
    MapComponent,
    MobilecarouselComponent
],
  templateUrl: './mobilecard.component.html',
  styleUrl: './mobilecard.component.scss',
})
export class MobilecardComponent {
  @Input() showHeading: boolean = true;
  coursesSub!: Subscription;
  mobiles = signal<Mobile[]>([]);
  errorMessage: string | null = null;
  loading: boolean = true;

  private mobileService = inject(MobileService);
  private http = inject(HttpClient);

  ngOnInit() {
    this.fetchMobiles();
    this.startAutoSlide();
  }
  async fetchMobiles() {
    this.loading = true;
    try {
      const data = await lastValueFrom(this.mobileService.getMobiles());
      this.mobiles.set(data);
    } catch (error: any) {
      if (
        error.status === 404 ||
        error.error?.message?.includes('list is Empty')
      ) {
        this.mobiles.set([]);
        this.errorMessage = 'No mobile data available.';
      } else {
        this.mobiles.set([]);
        this.errorMessage =
          'Failed to load data. Backend service might be down.';
      }
    } finally {
      this.loading = false;
    }
  }

  images: string[] = [
    'imgs/Media.jpg',
    'imgs/Media (1).jpg',
    'imgs/Media (2).jpg',
  ];

  currentIndex = 0;
  intervalId: any;

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 2000);
  }

  nextSlide() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

  // prevSlide() {
  //   this.currentIndex =
  //     (this.currentIndex - 1 + this.images.length) % this.images.length;
  // }

  ngOnDestroy() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  openAmazonLink() {
    const amazonLink =
      'https://www.amazon.in/?&tag=googhydrabk1-21&ref=pd_sl_5szpgfto9i_e&adgrpid=155259813593&hvpone=&hvptwo=&hvadid=674893540034&hvpos=&hvnetw=g&hvrand=1344926536313293702&hvqmt=e&hvdev=c&hvdvcmdl=&hvlocint=&hvlocphy=9061994&hvtargid=kwd-64107830&hydadcr=14452_2316413&gad_source=1';
    window.open(amazonLink, '_blank'); // '_blank' opens in a new tab
  }
}
