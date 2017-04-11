import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { IPoll } from './poll';
import { PollService } from './poll.service';

@Component({
    selector: 'new-poll',
    templateUrl: 'app/poll/new-poll.component.html'
})
export class NewPollComponent implements OnInit {
    constructor() { }
    poll: FormGroup;
    onSubmit({ value, valid }: { value: IPoll, valid: boolean }) {
        console.log(value, valid);
    }

    ngOnInit() {
        this.poll = new FormGroup({
            question: new FormControl('', [Validators.required, Validators.minLength(2)]),
            options: new FormGroup({
                order: new FormControl('', Validators.required),
                text: new FormControl('', [Validators.required, Validators.minLength(2)])
            })
        });
    }

    
}