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
var http_1 = require('@angular/http');
require('rxjs/add/operator/toPromise');
var Subject_1 = require("rxjs/Subject");
var interfaces_1 = require('../interfaces');
var VoteService = (function () {
    function VoteService(http) {
        this.http = http;
        this.currentState = interfaces_1.SignalRConnectionStatus.Disconnected;
        this.connectionStateSubject = new Subject_1.Subject();
        this.setConnectionIdSubject = new Subject_1.Subject();
        this.updateVoteSubject = new Subject_1.Subject();
        this.connectionState = this.connectionStateSubject.asObservable();
        this.setConnectionId = this.setConnectionIdSubject.asObservable();
        this.updateVote = this.updateVoteSubject.asObservable();
    }
    VoteService.prototype.start = function (debug) {
        var _this = this;
        $.connection.hub.logging = debug;
        var connection = $.connection;
        // reference signalR hub named 'broadcaster'
        var voteHub = connection.broadcaster;
        this.server = voteHub.server;
        // setConnectionId method called by server
        voteHub.client.setConnectionId = function (id) { return _this.onSetConnectionId(id); };
        // updateMatch method called by server
        voteHub.client.updateVote = function (polls) { return _this.onUpdateVote(polls); };
        // start the connection
        $.connection.hub.start()
            .done(function (response) { return _this.setConnectionState(interfaces_1.SignalRConnectionStatus.Connected); })
            .fail(function (error) { return _this.connectionStateSubject.error(error); });
        return this.connectionState;
    };
    VoteService.prototype.setConnectionState = function (connectionState) {
        console.log('connection state changed to: ' + connectionState);
        this.currentState = connectionState;
        this.connectionStateSubject.next(connectionState);
    };
    // Client side methods
    VoteService.prototype.onSetConnectionId = function (id) {
        this.setConnectionIdSubject.next(id);
    };
    VoteService.prototype.onUpdateVote = function (polls) {
        this.updateVoteSubject.next(polls);
    };
    // Server side methods
    VoteService.prototype.subscribeToVote = function (pollId) {
        this.server.subscribe(pollId);
    };
    VoteService.prototype.unsubscribeFromVote = function (pollId) {
        this.server.unsubscribe(pollId);
    };
    VoteService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], VoteService);
    return VoteService;
}());
exports.VoteService = VoteService;
//# sourceMappingURL=vote.service.js.map