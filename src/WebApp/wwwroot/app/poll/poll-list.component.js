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
var vote_service_1 = require('./services/vote.service');
var PollListComponent //implements OnInit 
 = (function () {
    //
    function PollListComponent //implements OnInit 
        (_pollService, _voteService) {
        this._pollService = _pollService;
        this._voteService = _voteService;
        this.pageTitle = 'Poll List';
        this.updateSubscription = new core_1.EventEmitter();
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
        //let self = this;
        var _this = this;
        //self._voteService.updateVote
        //    .subscribe(poll =>
        //    {
        //        this.polls[this.polls.findIndex(x => x.id == poll.id)] = poll;
        //    }
        //);
        this._voteService.start(true).subscribe(null, function (error) { return console.log('Error on init: ' + error); });
        this._voteService.updateVote
            .subscribe(function (polls) {
            _this.polls = polls;
        }, function (error) { return console.log('Error on updateVote method: ' + error); });
        this._pollService.getPolls()
            .subscribe(function (polls) { return _this.polls = polls; }, function (error) { return _this.errorMessage = error; });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PollListComponent //implements OnInit 
    .prototype, "poll", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], PollListComponent //implements OnInit 
    .prototype, "connection", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PollListComponent //implements OnInit 
    .prototype, "updateSubscription", void 0);
    PollListComponent //implements OnInit 
     = __decorate([
        core_1.Component({
            selector: 'poll-list',
            templateUrl: 'app/poll/poll-list.component.html',
            providers: [vote_service_1.VoteService]
        }), 
        __metadata('design:paramtypes', [poll_service_1.PollService, vote_service_1.VoteService])
    ], PollListComponent //implements OnInit 
    );
    return PollListComponent //implements OnInit 
    ;
}());
exports.PollListComponent //implements OnInit 
 = PollListComponent //implements OnInit 
;
//# sourceMappingURL=poll-list.component.js.map