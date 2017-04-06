import { Component, OnInit }  from '@angular/core';

import { IPoll } from './poll';
//import { PolltService } from './poll.service';

@Component({
    selector: 'poll-list',
    templateUrl: 'app/poll/poll-list.component.html',
    //styleUrls: ['app/products/product-list.component.css']
})
export class PollListComponent //implements OnInit 
{
    pageTitle: string = 'Poll List';
    
    //listFilter: string;
    //errorMessage: string;

    polls: IPoll[];

    //constructor(private _productService: ProductService) {

    //}

    //ngOnInit(): void {
    //    this._productService.getProducts()
    //        .subscribe(products => this.products = products,
    //        error => this.errorMessage = <any>error);
    //}
}