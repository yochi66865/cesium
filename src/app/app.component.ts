import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

  name = 'yochi';
  animal = 'dog';
  constructor(private dialog: MatDialog) { }
  title = 'basic-angular';
}
