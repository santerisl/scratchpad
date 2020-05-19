import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import Scratchpad from '../Scratchpad';
import StorageService from '../StorageService';


@Component({
  selector: 'app-scratchpad',
  templateUrl: './scratchpad.component.html',
  styleUrls: ['./scratchpad.component.css']
})

export class ScratchpadComponent implements OnInit {

  itemInput: string;

  scratchpad: Scratchpad;
  @Input() storageService: StorageService;
  @Input() id: string;
  @Output() removeScratchpadEvent = new EventEmitter<string>();

  @ViewChild('newItemInputElement') itemInputElement: ElementRef;

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

  removeItem(removedItemId: number) {
    this.scratchpad.items = this.scratchpad.items.filter(
      item => item.id !== removedItemId);
  }

  remove() {
    this.storageService.removeScratchpad(this.id)
      .then(() => this.removeScratchpadEvent.emit(this.id))
      .catch(error => console.error('Remove', error));
  }
}
