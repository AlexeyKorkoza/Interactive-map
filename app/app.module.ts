import {NgModule}      from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';
import {HttpModule}   from '@angular/http';

import {AppComponent} from './app.component';
import {MapComponent} from './map/map.component';

import {TypeModule} from './type/type.module';

const appRoutes: Routes = [
    {path: '', component: MapComponent}
];

@NgModule({
    imports: [
        BrowserModule,
        RouterModule,
        TypeModule,
        HttpModule,
        RouterModule.forRoot(appRoutes)
    ],
    declarations: [
        AppComponent,
        MapComponent
    ],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {
}