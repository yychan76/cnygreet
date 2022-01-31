import { Component, NgZone } from '@angular/core';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  titles: string[] = [
    '🍊🧧 Happy and Healthy Year of the Tiger! 🧧🍊',
    '🍊🧧 If you are studying, wish you good grades 🎓! 🧧🍊',
    '🍊🧧 If you are working, wish you earn big bucks 💵! 🧧🍊',
    '🍊🧧 If you are retired, wish you stay fit 🏃🏻, sharp and healthy! 🧧🍊',
    '🍊🧧 If you are a photographer, wish you capture inspiring 🌄 shots this year! 🧧🍊',
    '🍊🧧 If you cook, wish you try delicious recipes 🥘 this year! 🧧🍊',
    '🍊🧧 If you code, wish you have inspired ideas 💎 this year! 🧧🍊',
  ];
  title = this.titles[0];
  titleCounter: number = 0;
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

  cycleTitle() {
    this.titleCounter++;
    this.titleCounter %= this.titles.length;
    console.log(this.titleCounter);
    this.title = this.titles[this.titleCounter];
  }

  toggle(): void {
    this.cycleTitle();
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
