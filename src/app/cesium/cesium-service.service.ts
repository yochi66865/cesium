import { ElementRef, Injectable } from '@angular/core';
import * as Cesium from 'cesium';
import { Shop } from '../model/shop.model';

const CESIUM_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlNDViODRjMi1jNDNmLTRiMjUtOWE3Ny01MTE1MGEzMTk2MjMiLCJpZCI6MTE2NDY2LCJpYXQiOjE2Njk3MjY3Mzh9.8gaTQPKhD9KvyBwPU0sM3zHrBBdYq9jHfdGlFN0Cpmw';
Cesium.Ion.defaultAccessToken = CESIUM_TOKEN;

@Injectable({
  providedIn: 'root',
})
export class CesiumService {
  viewer!: Cesium.Viewer;

  constructor() {}

  initialCesium(el: ElementRef) {
    var extent = Cesium.Rectangle.fromDegrees(380.0, 380.0, 38.0, 38.0);

    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

    const viewer = new Cesium.Viewer(el.nativeElement, {
      imageryProvider: Cesium.createWorldImagery({
        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
      }),
      infoBox: false,
      shouldAnimate: true,
      baseLayerPicker: true,
      selectionIndicator: false,
    });

    const scene = viewer.scene;

    if (!scene.pickPositionSupported) {
      window.alert('This browser does not support pickPosition.');
    }

    viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(35.08182, 31.41173, 300000),
    });

    const handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function (click: any) {
      const cartesian = viewer.camera.pickEllipsoid(
        click.position,
        scene.globe.ellipsoid
      );

      console.log('cartesian', cartesian);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  addEntityToMap(newEntity: Shop) {
    var url = Cesium.buildModuleUrl('../../assets/icons/store.png');
    var billboard = this.viewer.entities.add({
      id: newEntity.id,
      position: new Cesium.Cartesian3(
        newEntity?.coordinates?.x,
        newEntity?.coordinates?.y,
        newEntity?.coordinates?.z
      ),
      billboard: {
        image: url,
      },
    });
  }

  removeEntityFromMap(entityId: string) {
    this.viewer.entities.removeById(entityId);
  }
}
