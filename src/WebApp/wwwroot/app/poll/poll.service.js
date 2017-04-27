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
var Rx_1 = require('rxjs/Rx');
require('rxjs/add/operator/do');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');
require('rxjs/add/observable/throw');
var PollService = (function () {
    function PollService(_http) {
        this._http = _http;
        this._pollUrl = 'api/polls';
        this._voteUrl = 'api/polls/v/';
    }
    PollService.prototype.getPolls = function () {
        return this._http.get(this._pollUrl)
            .map(function (response) { return response.json(); })
            .do(function (data) { return console.log('All: ' + JSON.stringify(data)); })
            .catch(this.handleError);
    };
    PollService.prototype.getPoll = function (id) {
        return this.getPolls()
            .map(function (products) { return products.find(function (p) { return p.id === id; }); });
    };
    PollService.prototype.voteOption = function (pollId, optionOrder) {
        var body = JSON.stringify({ 'optionOrder': optionOrder });
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http
            .put(this._voteUrl + pollId, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PollService.prototype.postPoll = function (data) {
        //let body = JSON.stringify(data);
        var body = data;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this._http
            .post(this._pollUrl, body, options)
            .map(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    PollService.prototype.handleError = function (error) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Rx_1.Observable.throw(error.json().error || 'Server error');
    };
    PollService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [http_1.Http])
    ], PollService);
    return PollService;
}());
exports.PollService = PollService;
//# sourceMappingURL=poll.service.js.map