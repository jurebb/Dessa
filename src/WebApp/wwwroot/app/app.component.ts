import { Component } from '@angular/core';
import 'rxjs/Rx'; 

@Component({
    selector: 'my-app',
    //template: '<poll-list></poll-list>'
    template: '<router-outlet></router-outlet>'
})
export class AppComponent { }