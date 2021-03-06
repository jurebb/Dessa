﻿import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IPoll } from './poll';
import { IStats } from './stats';

@Injectable()
export class PollService {
    private _pollUrl = 'api/polls';
    private _myPollUrl = 'api/mypolls';
    private _voteUrl = 'api/polls/v/';
    private _statsUrl = 'api/stats';
    
    constructor(private _http: Http) { }

    getPolls(): Observable<IPoll[]> {
        return this._http.get(this._pollUrl)
            .map((response: Response) => <IPoll[]>response.json())
            .catch(this.handleError);
    }

    getPoll(id: number): Observable<IPoll> {
        return this.getPolls()
            .map((products: IPoll[]) => products.find(p => p.id === id));
    }

    getMyPolls(): Observable<IPoll[]> {
        return this._http.get(this._myPollUrl)
            .map((response: Response) => <IPoll[]>response.json())
            .catch(this.handleError);
    }

    getStats(): Observable<IStats> {
        return this._http.get(this._statsUrl)
            .map((response: Response) => <IStats>response.json())
            .catch(this.handleError);
    }

    voteOption(pollId: string, optionOrder: string): Observable<IPoll[]> {
        let body = JSON.stringify({ 'optionOrder': optionOrder });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http
            .put(this._voteUrl + pollId, body, options)
            .map((response: Response) => <IPoll[]>response.json())
            .catch(this.handleError);
    }

    postPoll(data: IPoll): Observable<IPoll> {
        //let body = JSON.stringify(data);
        let body = data;
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this._http
            .post(this._pollUrl, body, options)
            .map((response: Response) => <IPoll>response.json())
            .catch(this.handleError);
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
