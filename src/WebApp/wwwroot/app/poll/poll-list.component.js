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
var poll_service_1 = require('./poll.service');
//import { IPollOptions } from './poll-options';
var PollListComponent //implements OnInit 
 = (function () {
    function PollListComponent //implements OnInit 
        (_pollService) {
        this._pollService = _pollService;
        this.pageTitle = 'Poll List';
    }
    PollListComponent //implements OnInit 
    .prototype.voteOption = function (pollId, optionId, event) {
        var _this = this;
        this._pollService.voteOption(pollId, optionId)
            .subscribe(function (polls) { return _this.polls = polls; }, function (error) { return _this.errorMessage = error; });
        //event.srcElement.children[0].attributes.innerHTML = this.voteNumUpdated;
    };
    ;
    PollListComponent //implements OnInit 
    .prototype.ngOnInit = function () {
        var _this = this;
        this._pollService.getPolls()
            .subscribe(function (polls) { return _this.polls = polls; }, function (error) { return _this.errorMessage = error; });
    };
    PollListComponent //implements OnInit 
     = __decorate([
        core_1.Component({
            selector: 'poll-list',
            templateUrl: 'app/poll/poll-list.component.html',
        }), 
        __metadata('design:paramtypes', [poll_service_1.PollService])
    ], PollListComponent //implements OnInit 
    );
    return PollListComponent //implements OnInit 
    ;
}());
exports.PollListComponent //implements OnInit 
 = PollListComponent //implements OnInit 
;
//# sourceMappingURL=poll-list.component.js.map