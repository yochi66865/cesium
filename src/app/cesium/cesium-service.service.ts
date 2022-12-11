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
  scene!: Cesium.Scene;

  constructor() {}

  initialCesium(el: ElementRef) {
    var extent = Cesium.Rectangle.fromDegrees(380.0, 380.0, 38.0, 38.0);

    Cesium.Camera.DEFAULT_VIEW_RECTANGLE = extent;
    Cesium.Camera.DEFAULT_VIEW_FACTOR = 0;

    this.viewer = new Cesium.Viewer(el.nativeElement, {
      sceneMode: Cesium.SceneMode.SCENE3D,
      imageryProvider: Cesium.createWorldImagery({
        style: Cesium.IonWorldImageryStyle.AERIAL_WITH_LABELS,
      }),
      infoBox: false,
      shouldAnimate: true,
      baseLayerPicker: true,
      selectionIndicator: false,
    });

    this.scene = this.viewer.scene;

    if (!this.scene.pickPositionSupported) {
      window.alert('This browser does not support pickPosition.');
    }

    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(35.08182, 31.41173, 300000),
    });
  }

  addEntityToMap(newEntity: Shop) {
    const { x, y, z } = newEntity.coordinates ?? {};
    const entity = this.viewer.entities.add({
      id: newEntity.id,
      label: {
        show: false,
        showBackground: true,
        font: '18px ariel',
        horizontalOrigin: Cesium.HorizontalOrigin.LEFT,
        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
        pixelOffset: new Cesium.Cartesian2(15, 0),
        text: `name store is ${newEntity.name}`,
      },
      position: new Cesium.Cartesian3(x, y, z),
      billboard: {
        image: '../../assets/icons/store.png',
        scale: new Cesium.ConstantProperty(0.5),
        color: new Cesium.ConstantProperty(Cesium.Color.BLACK),
      },
    });

    this.hoverOnEntity(entity);
  }

  removeEntityFromMap(entityId: string) {
    this.viewer.entities.removeById(entityId);
  }

  clickOnMap() {
    const handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas);
    handler.setInputAction((click: any) => {
      const cartesian = this.viewer.camera.pickEllipsoid(
        click.position,
        this.scene.globe.ellipsoid
      );

      console.log('cartesian', cartesian);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  }

  hoverOnEntity(entity: Cesium.Entity.ConstructorOptions) {
    let handler;
    // If the mouse is over the billboard, change its scale and color
    handler = new Cesium.ScreenSpaceEventHandler(this.scene.canvas);
    handler.setInputAction((movement: any) => {
      const pickedObject = this.scene.pick(movement.endPosition);
      if (!entity.billboard) {
        entity.billboard = new Cesium.BillboardGraphics({});
      }

      if (Cesium.defined(pickedObject) && pickedObject.id === entity) {
        entity.billboard.scale = new Cesium.ConstantProperty(1.0);
        entity.billboard.color = new Cesium.ConstantProperty(
          Cesium.Color.YELLOW
        );
        if (entity.label) {
          entity.label.show = true;
        }
      } else {
        entity.billboard.scale = new Cesium.ConstantProperty(0.5);
        entity.billboard.color = new Cesium.ConstantProperty(
          Cesium.Color.BLACK
        );
        if (entity.label) {
          entity.label.show = false;
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
  }
}
