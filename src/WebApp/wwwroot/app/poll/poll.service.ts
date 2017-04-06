import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IPoll } from './poll';

@Injectable()
export class PollService {
    private _pollUrl = 'api/polls';
    
    constructor(private _http: Http) { }

    getPolls(): Observable<IPoll[]> {
        return this._http.get(this._pollUrl)
            .map((response: Response) => <IPoll[]>response.json())
            .do(data => console.log('All: ' + JSON.stringify(data)))
            .catch(this.handleError);
    }

    getPoll(id: number): Observable<IPoll> {
        return this.getPolls()
            .map((products: IPoll[]) => products.find(p => p.id === id));
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
