import { Component, Input, Output, EventEmitter } from '@angular/core';
import Item from '../Item';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent {
  modifyInput: string;
  @Input() item: Item;
  @Output() modifyItemEvent = new EventEmitter<Item>();
  @Output() removeItemEvent = new EventEmitter<number>();

  modify() {
    this.modifyItemEvent.emit({id: this.item.id, content: this.modifyInput});
  }

  remove() {
    this.removeItemEvent.emit(this.item.id);
  }
}
