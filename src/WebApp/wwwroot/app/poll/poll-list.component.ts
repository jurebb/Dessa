import { Component, OnInit, Input, Output, EventEmitter }  from '@angular/core';

import { IPoll } from './poll';
import { PollService } from './poll.service';

import { VoteService } from './services/vote.service';
import { SignalRConnectionStatus } from './interfaces';


@Component({
    selector: 'poll-list',
    templateUrl: 'app/poll/poll-list.component.html',
    providers: [VoteService]
})
export class PollListComponent //implements OnInit 
{
    pageTitle: string = 'Poll List';
    
    //listFilter: string;
    errorMessage: string;
    voteNumUpdated: string;

    polls: IPoll[];

    //signalR
    @Input() poll: IPoll;
    @Input() connection: string;
    @Output() updateSubscription = new EventEmitter();
    subscribed: boolean;
    //

    constructor(private _pollService: PollService, private _voteService: VoteService) {

    }

    voteOption(pollId: string, optionId: string, event): void {
        this._pollService.voteOption(pollId, optionId)
            .subscribe(polls => this.polls = polls,
            error => this.errorMessage = <any>error);
        //event.srcElement.children[0].attributes.innerHTML = this.voteNumUpdated;
        
    };

    ngOnInit(): void {
        //let self = this;

        //self._voteService.updateVote
        //    .subscribe(poll =>
        //    {
        //        this.polls[this.polls.findIndex(x => x.id == poll.id)] = poll;
        //    }
        //);
        this._voteService.start(true).subscribe(
            null,
            error => console.log('Error on init: ' + error));

        this._voteService.updateVote
            .subscribe(polls => {
                this.polls = polls;
            },
            error => console.log('Error on updateVote method: ' + error)
        );

        this._pollService.getPolls()
            .subscribe(polls => this.polls = polls,
            error => this.errorMessage = <any>error);
    }
}