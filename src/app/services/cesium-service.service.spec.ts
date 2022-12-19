import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JulianDate } from 'cesium';
import * as Cesium from 'cesium';
import { CesiumService } from './cesium-service.service';
import { ElementRef } from '@angular/core';
import { CesiumComponent } from '../cesium/cesium.component';
import { Shop } from '../model/shop.model';

describe('CesiumServiceService', () => {
  let service: CesiumService;
  let component: CesiumComponent;
  let fixture: ComponentFixture<CesiumComponent>;
  let compiled: HTMLElement;
  let nativeElement: Element | null;
  let testElement: ElementRef;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CesiumComponent],
    }).compileComponents();
    (window as any)['CESIUM_BASE_URL'] = '/assets/cesium/';

    service = TestBed.inject(CesiumService);
    fixture = TestBed.createComponent(CesiumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.nativeElement as HTMLElement;
    nativeElement = compiled.querySelector('.cesium-map');
    testElement = { nativeElement };
    service.initialCesium(testElement);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initial cesium', function () {
    expect(service.viewer).toBeTruthy();
    expect(service.scene.mode).toEqual(3);
  });

  it('should fly To Israel', function () {
    const position = {
      duration: 0,
      destination: Cesium.Cartesian3.fromRadians(0.6, 0.55, 690000),
    };

    service.flyToIsrael();
    expect(service.viewer).toBeTruthy();
    expect(service.viewer.camera.position.x).toEqual(position.destination.x);
    expect(service.viewer.camera.position.y).toEqual(position.destination.y);
    expect(service.viewer.camera.position.z).toEqual(position.destination.z);
  });

  it('should add entity to map', function () {
    const shop: Shop = {
      id: '111',
      name: 'shop1',
      city: 'Ashdod',
      address: 'Shderot Bnei Brit',
      coordinates: {
        x: 4463335.28810235,
        y: 3085305.6733755213,
        z: 3341393.8268000875,
      },
    };

    const shop2 = {
      id: '222',
      name: 'shop2',
      city: 'Beer Sheva',
      address: 'Keren Hiesod',
      coordinates: {
        x: 4481753.635793454,
        y: 3114942.21347764,
        z: 3289185.0199353206,
      },
    };

    service.addEntityToMap(shop);
    service.addEntityToMap(shop2);

    expect(service.viewer.entities.values.length).toEqual(2);
    expect(service.viewer.entities.getById('111')).toEqual(
      service.viewer.entities.values[0]
    );
    const positionShop1 = service.viewer.entities
      .getById('111')
      ?.position?.getValue(new JulianDate());
    const positionShop2 = service.viewer.entities
      .getById('111')
      ?.position?.getValue(new JulianDate());

    expect(positionShop1?.x).toEqual(shop.coordinates?.x);
    expect(positionShop1?.y).toEqual(shop.coordinates?.y);
    expect(positionShop1?.z).toEqual(shop.coordinates?.z);
    expect(positionShop2?.x).toEqual(shop2.coordinates?.x);
    expect(positionShop2?.y).toEqual(shop2.coordinates?.y);
    expect(positionShop2?.z).toEqual(shop2.coordinates?.z);
  });
});
