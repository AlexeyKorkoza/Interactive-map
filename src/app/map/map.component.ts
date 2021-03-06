import {
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import * as L from "leaflet";

import { PlaceService } from '../place/service/place.service';
import { Place } from '../place/model/place';
import { TypeService } from '../type/service/type.service';
import { Type } from "../type/model/type";

declare let Icon: any;

@Component({
    selector: 'map',
    templateUrl: 'map.component.html',
    providers: [
        PlaceService,
        TypeService,
    ]
})

export class MapComponent implements OnInit {

    constructor(
      private placeService: PlaceService,
      private typeService: TypeService) {}

    private map;
    private markers = new L.FeatureGroup();
    private LeafIcon;
    places: Place[];
    types: Type[];

    @ViewChild('map') mapContainer;

    ngOnInit() {
        this.createMap();
        this.getTypes();
        this.getPlaces();
    }

    addPlacesAtTheMap(places: Array<Place>) {
        for (let i = 0; i < places.length; i++) {
            let nameOfImage = this.types[+places[i].id_type - 1];
            let typeOfPlace = this.types[+places[i].id_type - 1];
            let id_place = places[i].id_place;
            let iconPlace = new this.LeafIcon({iconUrl: "../../assets/img/" + nameOfImage.marker_img + ".png"});
            let marker = L.marker([places[i].lat, places[i].lng],
                {icon: iconPlace}).bindPopup("<b>\"" + places[i].name_place + "\",</b> " + typeOfPlace + "<br>" +
                places[i].address + "<br/>" + "<button class='getDirectionBtn' id=id_place_" + id_place + ">Проложить маршрут</button>").openPopup().addTo(this.map);
            this.markers.addLayer(marker);
        }
        this.map.addLayer(this.markers);
    }

    getTypes() {
        this.typeService.getAllTypes()
            .subscribe(
                types => {
                    this.types = types;
                },
                err => {
                    console.log(err);
                });
    }

    getPlaces() {
        this.placeService.getAllPlaces()
            .subscribe(
                places => {
                    this.places = places;
                    this.addPlacesAtTheMap(this.places);
                },
                err => {
                    console.log(err);
                });
    }

    createMap() {
        this.map = L.map("map", {
            zoomControl: false,
            center: L.latLng(53.6834599, 23.8342648),
            zoom: 13,
            minZoom: 4,
            maxZoom: 19,
            layers: L.tileLayer(
              "http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png",
              {
                attribution: "&copy; <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a>, " +
                "Tiles courtesy of <a href='http://hot.openstreetmap.org/' target='_blank'>Humanitarian OpenStreetMap Team</a>"
              }
            )
        });

        this.LeafIcon = L.Icon.extend({
            options: {
                iconSize: [54, 54],
                iconAnchor: [16, 37],
                popupAnchor: [0, -30]
            }
        });

        L.control.zoom({position: "topright"}).addTo(this.map);
    }
}
