import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent }   from './app.component';
import { PollModule } from './poll/poll.module';
import { HttpModule } from '@angular/http';

import { RouterModule } from '@angular/router';


@NgModule({
    imports: [BrowserModule,
        RouterModule.forRoot([
            { path: '', redirectTo: 'polls', pathMatch: 'full' },
            { path: '**', redirectTo: 'polls', pathMatch: 'full' }
        ]),
        HttpModule,
        PollModule],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }