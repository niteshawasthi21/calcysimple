import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SimplecalcyComponent } from './simplecalcy/simplecalcy.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,SimplecalcyComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
