import { Component, OnInit } from '@angular/core';
import { Shop } from '../model/shop.model';
import shopsJson from '../../assets/shops.json';

@Component({
  selector: 'shops',
  templateUrl: './shops.component.html',
  styleUrls: ['./shops.component.less'],
})
export class ShopsComponent implements OnInit {
  shops: Shop[] = [];
  constructor() {
    this.shops = shopsJson;
  }

  ngOnInit(): void {}
}
