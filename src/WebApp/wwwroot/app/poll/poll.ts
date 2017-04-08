/* Defines the poll entity */
import { IPollOptions } from './poll-options';

export interface IPoll {
    id: number;
    dateCreated: string;
    userName: string;
    urgentFlag: boolean;
    question: string;
    numOfOptions: number;
    options: IPollOptions[];      //options[]
    sumVotes: number;
    //history: string[];      //history[]
}