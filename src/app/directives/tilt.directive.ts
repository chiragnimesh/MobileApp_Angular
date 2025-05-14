import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import VanillaTilt from 'vanilla-tilt';

@Directive({
  selector: '[appTilt]',
  standalone: true,
})
export class TiltDirective implements OnInit {
  @Input() tiltOptions: any;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    VanillaTilt.init(
      this.el.nativeElement,
      this.tiltOptions || {
        max: 15,
        speed: 400,
        glare: true,
        'max-glare': 0.3,
      }
    );
  }
}
