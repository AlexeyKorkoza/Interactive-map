import {Component, OnInit} from '@angular/core';
import {TypeService} from './service/type.service';
import {Type} from  './model/type';
import {Response} from "@angular/http";

@Component({
    selector: 'type',
    templateUrl: 'app/type/type.component.html',
    providers: [TypeService]
})

export class TypeComponent implements OnInit {

    types: Type[] ;

    constructor(private typeService: TypeService) {
    }

    ngOnInit() {
        this.typeService.getData()
            .subscribe(
                types => this.types = types,
                err => {
                    console.log(err);
                });
    }

    private value: any = {};

    public selected(value: any): void {
        console.log('Selected value is: ', value);
    }

}