import { Component, OnInit }  from '@angular/core';

import { IPoll } from './poll';
import { PollService } from './poll.service';

@Component({
    selector: 'poll-list',
    templateUrl: 'app/poll/poll-list.component.html',
    //styleUrls: ['app/products/product-list.component.css']
})
export class PollListComponent //implements OnInit 
{
    pageTitle: string = 'Poll List';
    
    //listFilter: string;
    errorMessage: string;

    polls: IPoll[];

    constructor(private _pollService: PollService) {

    }

    ngOnInit(): void {
        this._pollService.getPolls()
            .subscribe(polls => this.polls = polls,
            error => this.errorMessage = <any>error);
    }
}