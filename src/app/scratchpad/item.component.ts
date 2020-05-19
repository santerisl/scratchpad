import { Component, Input, Output, EventEmitter } from '@angular/core';
import Item from '../Item';
import StorageService from '../StorageService';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})

export class ItemComponent {
  modifyInput: string;
  @Input() item: Item;
  @Input() storageService: StorageService;
  @Input() id: string;
  @Output() removeItemEvent = new EventEmitter<number>();

  modify() {
    this.storageService.modifyItem(this.id, this.item.id, this.modifyInput)
      .then(() => this.item.content = this.modifyInput)
      .catch(error => console.error('Modify Item', error));
  }

  remove() {
    console.log("remove item");
    this.storageService.removeItem(this.id, this.item.id)
      .then(() => this.removeItemEvent.emit(this.item.id))
      .catch(error => console.error('Remove Item', error));
  }
}
