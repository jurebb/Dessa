import { NgModule } from '@angular/core';
import { PollListComponent } from './poll-list.component';
import { CommonModule } from '@angular/common';
import { PollService } from './poll.service';


@NgModule({
    imports: [CommonModule ],
    declarations: [
        PollListComponent
    ],
    exports: [
        PollListComponent
    ],
    providers: [
        PollService
    ]
})
export class PollModule { }