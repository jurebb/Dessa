/* SignalR related interfaces  */
import { IPoll } from './poll';

export interface VoteSignalR extends SignalR {
    broadcaster: VoteProxy
}

export interface VoteProxy {
    client: VoteClient;
    server: VoteServer;
}

export interface VoteClient {
    setConnectionId: (id: string) => void;
    updateVote: (poll: IPoll[]) => void;
}

export interface VoteServer {
    subscribe(pollId: number): void;
    unsubscribe(pollId: number): void;
}

export enum SignalRConnectionStatus {
    Connected = 1,
    Disconnected = 2,
    Error = 3
}