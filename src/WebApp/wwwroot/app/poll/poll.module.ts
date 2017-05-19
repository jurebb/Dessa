import { NgModule } from '@angular/core';
import { PollListComponent } from './poll-list.component';
import { NewPollComponent } from './new-poll.component';
import { NewOptionComponent } from './new-option.component';
import { CommonModule } from '@angular/common';
import { PollService } from './poll.service';
import { RouterModule } from '@angular/router';
import { VoteService } from './services/vote.service'

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
        NewPollComponent,
        NewOptionComponent
    ],
    exports: [
        PollListComponent,
        NewPollComponent,
        NewOptionComponent
    ],
    providers: [
        PollService,
        VoteService
    ]
})
export class PollModule { }