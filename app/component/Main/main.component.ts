import {
    Component,
    OnInit
} from '@angular/core';

declare var L: any;
declare var Icon: any;

@Component({
    selector: 'my-app',
    templateUrl: 'app/component/Main/main.component.html',
    styleUrls: ['app/css/style.css']
})

export class MainComponent implements OnInit {

    ngOnInit() {
        document.getElementById('init_map').innerHTML = "<div id='map'></div>";
        document.getElementById("map").style.height = window.innerHeight + "px";

        let map = L.map('map').setView([53.6834599, 23.8342648], 13);
        L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '',
            maxZoom: 18
        }).addTo(map);

        let LeafIcon = L.Icon.extend({
            options: {
                iconSize: [54, 54],
                iconAnchor: [16, 37],
                popupAnchor: [0, -30]
            }
        });
    }

    public types:Array<string> = ["Все объекты", "Аптека", "Клуб", "Магазин"];

    private value:any = {};

    public selected(value:any):void {
        console.log('Selected value is: ', value);
    }
}