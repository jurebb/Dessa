/* Defines the poll entity */
export interface IPoll {
    id: number;
    dateCreated: string;
    userName: string;
    urgentFlag: boolean;
    question: string;
    numOfOptions: number;
    options: string[];      //options[]
    sumVotes: number;
    history: string[];      //history[]
}