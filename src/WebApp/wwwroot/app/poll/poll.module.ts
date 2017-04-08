import { NgModule } from '@angular/core';
import { PollListComponent } from './poll-list.component';
import { NewPollComponent } from './new-poll.component';
import { CommonModule } from '@angular/common';
import { PollService } from './poll.service';
import { RouterModule } from '@angular/router';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'polls', component: PollListComponent },
            { path: 'newpoll', component: NewPollComponent }
        ])],
    declarations: [
        PollListComponent,
        NewPollComponent
    ],
    exports: [
        PollListComponent,
        NewPollComponent
    ],
    providers: [
        PollService
    ]
})
export class PollModule { }