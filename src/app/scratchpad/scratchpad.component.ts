import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Scratchpad from '../Scratchpad';
import Item from '../Item';


@Component({
  selector: 'app-scratchpad',
  templateUrl: './scratchpad.component.html',
  styleUrls: ['./scratchpad.component.css']
})

export class ScratchpadComponent implements OnInit {

  itemInput: string;
  modifyId: number;
  modifyInput: string;
  @Input() scratchpad: Scratchpad;
  @Output() removeEvent = new EventEmitter<Scratchpad>();

  constructor() { }

  ngOnInit(): void {
  }

  addItem() {
    this.scratchpad.items.unshift({
        id: this.scratchpad.itemCount,
        time: new Date(),
        content: this.itemInput});
    this.itemInput = '';
    this.scratchpad.itemCount++;
  }

  removeItem(item: Item) {
    this.scratchpad.items = this.scratchpad.items.filter(
      other => item !== other);
  }

  modifyItem(item: Item) {
    item.content = this.modifyInput;
    this.modifyId = undefined;
  }

  remove() {
    this.removeEvent.emit(this.scratchpad);
  }

  modify(item: Item) {
    this.modifyId = item.id;
    this.modifyInput = item.content;
  }
}
