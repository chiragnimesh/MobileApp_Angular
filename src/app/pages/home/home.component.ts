import { HttpClient } from '@angular/common/http';
import { Component, inject} from '@angular/core';
import { RouterLink } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { MobilecardComponent } from "../mobilecard/mobilecard.component";
import { TestComponent } from "../test/test.component";


@Component({
  selector: 'app-home',
  imports: [RouterLink, MobilecardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  fullText =
    'Dive into the latest and greatest in mobile technology. Get ready to be amazed!';
  displayedText = '';
  index = 0;
  typingSpeed = 100; // Adjust typing speed in milliseconds
  courses: any[] = [];
  private http = inject(HttpClient);

  ngOnInit() {
    this.typeText();
    this.httpRequestData();
  }

  async httpRequestData() {
    const posts = await lastValueFrom(
      this.http.get<any>('http://localhost:8080/mobiles')
    );
    console.log(posts);
  }

  typeText() {
    if (this.index < this.fullText.length) {
      this.displayedText += this.fullText.charAt(this.index);
      this.index++;
      setTimeout(() => this.typeText(), this.typingSpeed);
    }
  }

  //Slides "All course" text downwards
  ngAfterViewInit() {
    this.observeScrollAnimation();
  }

  observeScrollAnimation() {
    const target = document.querySelector('.animate-on-scroll');
    if (!target) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(target);
  }
}
