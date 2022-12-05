import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Shop } from '../model/shop.model';
import shopsJson from '../../assets/shops.json';
import { toggleEntityToMap } from '../cesium-state/actions';

@Component({
  selector: 'shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.less'],
})
export class ShopsComponent implements OnInit {
  shops: Shop[] = [];
  constructor(private store: Store<any>) {
    this.shops = shopsJson;
  }

  ngOnInit(): void {}

  toggleShop(index: number) {
    this.store.dispatch(toggleEntityToMap({ toggleEntity: this.shops[index] }));
  }
}
