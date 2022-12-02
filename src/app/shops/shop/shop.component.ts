import { Component, Input, OnInit } from '@angular/core';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.less'],
})
export class ShopComponent implements OnInit {
  @Input() shop: Shop = {};

  constructor() {}

  ngOnInit(): void {}
}
