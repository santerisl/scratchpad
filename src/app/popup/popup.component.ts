import { Component, Input, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})

export class PopupComponent {

  public visible: boolean;
  @Input() headerText: string;

  @ContentChild('focusElement') onShowFocus: ElementRef;

  show() {
    this.visible = true;
    if (this.onShowFocus) {
      setTimeout(() => this.onShowFocus.nativeElement.focus(), 0);
    }
  }

  hide() {
    this.visible = false;
  }
}
