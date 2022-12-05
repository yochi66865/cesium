import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { reducers } from './app-reducer-map';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CesiumEffects } from './cesium-state/effects';
import { CesiumComponent } from './cesium/cesium.component';
import { ShopComponent } from './shops/shop/shop.component';
import { ShopsComponent } from './shops/shops.component';

@NgModule({
  declarations: [AppComponent, CesiumComponent, ShopsComponent, ShopComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
    DragDropModule,
    MatIconModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([CesiumEffects]),
    StoreDevtoolsModule.instrument(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
