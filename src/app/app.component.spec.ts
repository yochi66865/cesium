import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { CesiumEffects } from './cesium-state/effects';
import { cesiumReducer } from './cesium-state/reducer';
import { CesiumComponent } from './cesium/cesium.component';
import { ShopComponent } from './shops/shop/shop.component';
import { ShopsComponent } from './shops/shops.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({}),
        StoreModule.forFeature('cesium', cesiumReducer),
        EffectsModule.forRoot([CesiumEffects]),
      ],
      declarations: [
        AppComponent,
        CesiumComponent,
        ShopsComponent,
        ShopComponent,
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
