import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Shop } from 'src/app/model/shop.model';

@Component({
  selector: 'shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.less'],
})
export class ShopComponent implements OnInit {
  @Input() shop: Shop = {};
  @Output() toggleShop: EventEmitter<void> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  toggleShopEvent() {
    this.toggleShop.emit();
  }
}
