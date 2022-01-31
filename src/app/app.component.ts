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
  private alphabet_lower: string = 'abcdefghijklmnopqrstuvwxy';
  private alphabet_upper: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  private animStepTime: number = 20;
  intervals: number[] = [];

  constructor(private ngZone: NgZone) {}

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
    this.animationItem = animationItem;
  }

  animateText(text: string) {
    let textArr = Array.from(text);
    for (let i = 0; i < textArr.length; i++) {
      if (this.alphabet_lower.indexOf(textArr[i]) != -1) {
        let charIndex = this.alphabet_lower.indexOf(textArr[i]);
        let curr = 0;
        let interval = setInterval(() => {
          textArr[i] = this.alphabet_lower[curr];
          if (curr == charIndex) {
            clearInterval(interval);
          }
          curr++;
          this.title = textArr.join('');
          // console.log(textArr.join(''));
        }, this.animStepTime);
        this.intervals.push(interval as unknown as number);
      } else if (this.alphabet_upper.indexOf(textArr[i]) != -1) {
        let charIndex = this.alphabet_upper.indexOf(textArr[i]);
        let curr = 0;
        let interval = setInterval(() => {
          textArr[i] = this.alphabet_upper[curr];
          if (curr == charIndex) {
            clearInterval(interval);
          }
          curr++;
          this.title = textArr.join('');
        }, this.animStepTime);
        this.intervals.push(interval as unknown as number);
      }
    }
  }

  cycleTitle() {
    this.titleCounter++;
    this.titleCounter %= this.titles.length;
    this.animateText(this.titles[this.titleCounter]);
  }

  clearIntervals() {
    while (this.intervals.length > 0) {
      clearInterval(this.intervals.pop());
    }
  }

  toggle(): void {
    this.clearIntervals();
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
