import { NgModule } from '@angular/core';
import { PollListComponent } from './poll-list.component';
import { NewPollComponent } from './new-poll.component';
import { CommonModule } from '@angular/common';
import { PollService } from './poll.service';
import { RouterModule } from '@angular/router';

import { FormsModule } from '@angular/forms';       //as of new-poll
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([
            { path: 'polls', component: PollListComponent },
            { path: 'newpoll', component: NewPollComponent }
        ]),
        FormsModule,
        ReactiveFormsModule
    ],
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