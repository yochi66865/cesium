import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CesiumService } from '../services/cesium-service.service';

@Component({
  selector: 'app-cesium',
  templateUrl: './cesium.component.html',
  styleUrls: ['./cesium.component.less'],
})
export class CesiumComponent implements AfterViewInit {
  @ViewChild('appCesium') appCesiumElement!: ElementRef<any>;
  constructor(private cesiumService: CesiumService) {}

  ngAfterViewInit(): void {
    if (this.appCesiumElement) {
      this.cesiumService.initialCesium(this.appCesiumElement);
    } else {
      console.log('there is no element appCesium');
    }
  }
}
