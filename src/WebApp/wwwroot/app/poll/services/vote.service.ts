import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

//import { FeedSignalR, FeedProxy, FeedClient, FeedServer, SignalRConnectionStatus, ChatMessage, Match, Feed } from '../interfaces';
import { IPoll } from '../poll';
import { SignalRConnectionStatus, VoteClient, VoteServer, VoteSignalR, VoteProxy } from '../interfaces'


@Injectable()
export class VoteService {
    currentState = SignalRConnectionStatus.Disconnected;
    connectionState: Observable<SignalRConnectionStatus>;
    setConnectionId: Observable<string>;
    updateVote: Observable<IPoll[]>;

    private connectionStateSubject = new Subject<SignalRConnectionStatus>();
    private setConnectionIdSubject = new Subject<string>();
    private updateVoteSubject = new Subject<IPoll[]>();

    private server: VoteServer;

    constructor(private http: Http) {
        this.connectionState = this.connectionStateSubject.asObservable();

        this.setConnectionId = this.setConnectionIdSubject.asObservable();
        this.updateVote = this.updateVoteSubject.asObservable();
    }

    start(debug: boolean): Observable<SignalRConnectionStatus> {                        //TODO check debug      //proxy configuration

        $.connection.hub.logging = debug;

        let connection = <VoteSignalR>$.connection;
        // reference signalR hub named 'broadcaster'
        let voteHub = connection.broadcaster;
        this.server = voteHub.server;

        // setConnectionId method called by server
        voteHub.client.setConnectionId = id => this.onSetConnectionId(id);

        // updateMatch method called by server
        voteHub.client.updateVote = polls => this.onUpdateVote(polls);

        // start the connection
        $.connection.hub.start()
            .done(response => this.setConnectionState(SignalRConnectionStatus.Connected))
            .fail(error => this.connectionStateSubject.error(error));

        return this.connectionState;
    }

    private setConnectionState(connectionState: SignalRConnectionStatus) {
        console.log('connection state changed to: ' + connectionState);
        this.currentState = connectionState;
        this.connectionStateSubject.next(connectionState);
    }

    // Client side methods
    private onSetConnectionId(id: string) {
        this.setConnectionIdSubject.next(id);
    }

    private onUpdateVote(polls: IPoll[]) {
        this.updateVoteSubject.next(polls);
    }

    // Server side methods
    public subscribeToVote(pollId: number) {
        this.server.subscribe(pollId);
    }

    public unsubscribeFromVote(pollId: number) {
        this.server.unsubscribe(pollId);
    }
}