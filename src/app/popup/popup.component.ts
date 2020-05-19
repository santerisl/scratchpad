import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent {

  public visible: boolean;
  @Input() headerText: string;

  show() {
    this.visible = true;
  }

  hide() {
    this.visible = false;
  }
}
