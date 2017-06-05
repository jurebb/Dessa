import { NgModule } from '@angular/core';
import { PollListComponent } from './poll-list.component';
import { NewPollComponent } from './new-poll.component';
import { NewOptionComponent } from './new-option.component';
import { MyProfileComponent } from './my-profile.component';
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
            { path: 'newpoll', component: NewPollComponent },
            { path: 'userpolls', component: MyProfileComponent }
        ]),
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        PollListComponent,
        NewPollComponent,
        NewOptionComponent,
        MyProfileComponent
    ],
    exports: [
        PollListComponent,
        NewPollComponent,
        NewOptionComponent,
        MyProfileComponent
    ],
    providers: [
        PollService,
        VoteService
    ]
})
export class PollModule { }