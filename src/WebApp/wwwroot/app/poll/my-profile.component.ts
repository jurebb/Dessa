import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { IPoll } from './poll';
import { IStats } from './stats';
import { PollService } from './poll.service';


@Component({
    selector: 'my-profile',
    templateUrl: 'app/poll/my-profile.component.html'
})
export class MyProfileComponent 
{
    pageTitle: string = 'My profile';
    
    errorMessage: string;

    polls: IPoll[];

    stats: IStats;

    constructor(private _pollService: PollService) {

    }

    ngOnInit(): void {
        this._pollService.getMyPolls()
            .subscribe(polls => this.polls = polls,
            error => this.errorMessage = <any>error);

        this._pollService.getStats()
            .subscribe(stats => this.stats = stats,
            error => this.errorMessage = <any>error);
    }
}