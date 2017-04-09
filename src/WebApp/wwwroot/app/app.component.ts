import { Component } from '@angular/core';
import 'rxjs/Rx'; 

@Component({
    selector: 'my-app',
    //template: '<poll-list></poll-list>'
    template: ` <li><a [routerLink]="['/polls']">Polls</a></li>
                <li><a [routerLink]="['/newpoll']">New Poll</a></li >
                <router-outlet></router-outlet>`
})
export class AppComponent { }