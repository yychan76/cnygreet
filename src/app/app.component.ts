import { Component, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Happy and Healthy Year of the Tiger!';
  options: AnimationOptions = {
    path: 'assets/74268-cute-tiger.json',
  };
  private animationItem!: AnimationItem;
  paused: boolean = false;

  constructor(private ngZone: NgZone) {}

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
    this.animationItem = animationItem;
  }

  toggle(): void {
    this.ngZone.runOutsideAngular(() => {
      this.paused = !this.paused;
      if (this.paused) {
        this.animationItem.pause();
      } else {
        this.animationItem.play();
      }
    });
  }
}
