import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';

import { IPoll } from './poll';
import { PollService } from './poll.service';

@Component({
    //moduleId: module.id,
    selector: 'new-poll',
    templateUrl: 'app/poll/new-poll.component.html'
})
export class NewPollComponent implements OnInit {
    public myPoll: FormGroup;
    pollRec: IPoll;
    errorMessage: string;

    pageTitle: string = 'New poll';

    constructor(private fb: FormBuilder, private _pollService: PollService) { }
    /*
    onSubmit({ value, valid }: { value: IPoll, valid: boolean }) {
        console.log(value, valid);
    }*/

    ngOnInit() {
        this.myPoll = this.fb.group({
            question: ['', [Validators.required, Validators.minLength(5)]],
            options: this.fb.array([])
        });

        // add address
        this.addOption();

        /* subscribe to addresses value changes */
        // this.myForm.controls['addresses'].valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    }

    initOption() {
        return this.fb.group({
            text: ['', [Validators.required, Validators.minLength(2)]]
        });
    }

    addOption() {
        const control = <FormArray>this.myPoll.controls['options'];
        const addrCtrl = this.initOption();

        control.push(addrCtrl);

        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    }

    removeOption(i: number) {
        const control = <FormArray>this.myPoll.controls['options'];
        control.removeAt(i);
    }

    save(model: IPoll) {
       
       console.log(model);
    }

    postPoll(model: IPoll, event): void {
        this._pollService.postPoll(model)
            .subscribe(poll => this.pollRec = poll,
            error => this.errorMessage = <any>error);
    };
}