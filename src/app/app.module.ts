import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LottieModule, LottieCacheModule } from 'ngx-lottie';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

export function playerFactory() {
  return import(/* webpackChunkName: 'lottie-web' */ 'lottie-web/build/player/lottie_svg');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LottieModule.forRoot({ player: playerFactory }),
    LottieCacheModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
