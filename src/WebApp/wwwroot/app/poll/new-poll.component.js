"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var poll_service_1 = require('./poll.service');
var NewPollComponent = (function () {
    function NewPollComponent(fb, _pollService) {
        this.fb = fb;
        this._pollService = _pollService;
        this.pageTitle = 'New poll';
    }
    /*
    onSubmit({ value, valid }: { value: IPoll, valid: boolean }) {
        console.log(value, valid);
    }*/
    NewPollComponent.prototype.ngOnInit = function () {
        this.myPoll = this.fb.group({
            question: ['', [forms_1.Validators.required, forms_1.Validators.minLength(5)]],
            options: this.fb.array([])
        });
        // add address
        this.addOption();
        /* subscribe to addresses value changes */
        // this.myForm.controls['addresses'].valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    };
    NewPollComponent.prototype.initOption = function () {
        return this.fb.group({
            text: ['', [forms_1.Validators.required, forms_1.Validators.minLength(2)]]
        });
    };
    NewPollComponent.prototype.addOption = function () {
        var control = this.myPoll.controls['options'];
        var addrCtrl = this.initOption();
        control.push(addrCtrl);
        /* subscribe to individual address value changes */
        // addrCtrl.valueChanges.subscribe(x => {
        //   console.log(x);
        // })
    };
    NewPollComponent.prototype.removeOption = function (i) {
        var control = this.myPoll.controls['options'];
        control.removeAt(i);
    };
    NewPollComponent.prototype.save = function (model) {
        console.log(model);
    };
    NewPollComponent.prototype.postPoll = function (model, event) {
        var _this = this;
        this._pollService.postPoll(model)
            .subscribe(function (poll) { return _this.pollRec = poll; }, function (error) { return _this.errorMessage = error; });
    };
    ;
    NewPollComponent = __decorate([
        core_1.Component({
            //moduleId: module.id,
            selector: 'new-poll',
            templateUrl: 'app/poll/new-poll.component.html'
        }), 
        __metadata('design:paramtypes', [forms_1.FormBuilder, poll_service_1.PollService])
    ], NewPollComponent);
    return NewPollComponent;
}());
exports.NewPollComponent = NewPollComponent;
//# sourceMappingURL=new-poll.component.js.map