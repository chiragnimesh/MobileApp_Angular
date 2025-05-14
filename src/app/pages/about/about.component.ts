import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  imports: [],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  team = [
    { name: 'John Doe', role: 'Founder & CEO', image: './imgs/image1.jpeg' },
    { name: 'Jane Smith', role: 'Lead Developer', image: './imgs/image3.jpeg' },
    { name: 'Alice Johnson', role: 'Designer', image: './imgs/image2.jpeg' },
  ];
}
