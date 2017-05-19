/* Defines the poll entity */
import { IPollOptions } from './poll-options';

export interface IPoll {
    id: number;
    dateCreated: string;
    userName: string;
    question: string;
    numOfOptions: number;
    options: IPollOptions[];      //options[]
    sumVotes: number;
    //history: string[];      //history[]
}