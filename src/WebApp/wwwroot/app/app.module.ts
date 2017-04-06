import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { PollModule } from './poll/poll.module';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [BrowserModule,
        HttpModule,
        PollModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }