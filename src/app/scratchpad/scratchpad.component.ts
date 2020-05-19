import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Scratchpad from '../Scratchpad';
import Item from '../Item';
import StorageService from '../StorageService';


@Component({
  selector: 'app-scratchpad',
  templateUrl: './scratchpad.component.html',
  styleUrls: ['./scratchpad.component.css']
})

export class ScratchpadComponent implements OnInit {

  itemInput: string;
  modifyId: number;
  modifyInput: string;
  scratchpad: Scratchpad;
  @Input() storageService: StorageService;
  @Input() id: string;
  @Output() removeEvent = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {
    this.storageService.loadScratchpad(this.id)
      .then(sp => this.scratchpad = sp)
      .catch(error => console.error('Load', error));
  }

  addItem() {
    this.storageService.addItem(this.id, this.itemInput)
      .then(item => this.scratchpad.items.unshift(item))
      .catch(error => console.error('Add Item', error));
    this.itemInput = '';
  }

  removeItem(item: Item) {
    this.storageService.removeItem(this.id, item.id)
      .then(() => this.scratchpad.items = this.scratchpad.items.filter(
        other => item !== other))
      .catch(error => console.error('Remove Item', error));
  }

  modifyItem(item: Item) {
    this.storageService.modifyItem(this.id, item.id, this.modifyInput)
      .then(() => item.content = this.modifyInput)
      .catch(error => console.error('Modify Item', error));
    this.modifyId = undefined;
  }

  remove() {
    this.storageService.removeScratchpad(this.id)
      .then(() => this.removeEvent.emit(this.id))
      .catch(error => console.error('Remove', error));
  }

  modify(item: Item) {
    this.modifyId = item.id;
    this.modifyInput = item.content;
  }
}
