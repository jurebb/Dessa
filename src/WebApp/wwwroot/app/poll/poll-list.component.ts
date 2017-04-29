import { Component, OnInit }  from '@angular/core';

import { IPoll } from './poll';
import { PollService } from './poll.service';

//import { IPollOptions } from './poll-options';

@Component({
    selector: 'poll-list',
    templateUrl: 'app/poll/poll-list.component.html',
})
export class PollListComponent //implements OnInit 
{
    pageTitle: string = 'Poll List';
    
    //listFilter: string;
    errorMessage: string;
    voteNumUpdated: string;

    polls: IPoll[];

    constructor(private _pollService: PollService) {

    }

    voteOption(pollId: string, optionId: string, event): void {
        this._pollService.voteOption(pollId, optionId)
            .subscribe(polls => this.polls = polls,
            error => this.errorMessage = <any>error);
        //event.srcElement.children[0].attributes.innerHTML = this.voteNumUpdated;
        
    };

    ngOnInit(): void {
        this._pollService.getPolls()
            .subscribe(polls => this.polls = polls,
            error => this.errorMessage = <any>error);
    }
}