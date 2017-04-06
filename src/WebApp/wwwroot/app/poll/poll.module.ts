import { NgModule } from '@angular/core';
import { PollListComponent } from './poll-list.component';
import { CommonModule }       from '@angular/common';


@NgModule({
    imports: [CommonModule ],
    declarations: [
        PollListComponent
    ],
    exports: [
        PollListComponent
    ],
    providers: []
})
export class PollModule { }