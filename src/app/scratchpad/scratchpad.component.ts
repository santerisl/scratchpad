import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Scratchpad from '../Scratchpad';
import { getLine } from '../app.component';
import Item from '../Item';


@Component({
  selector: 'app-scratchpad',
  templateUrl: './scratchpad.component.html',
  styleUrls: ['./scratchpad.component.css']
})

export class ScratchpadComponent implements OnInit {

  @Input() scratchpad: Scratchpad;
  @Output() removeEvent = new EventEmitter<Scratchpad>();

  constructor() { }

  ngOnInit(): void {
  }

  addItem() {
    this.scratchpad.items.unshift({
        time: new Date(),
        content: getLine()});
  }

  removeItem(item: Item) {
    this.scratchpad.items = this.scratchpad.items.filter(other => item !== other);
  }

  remove() {
    this.removeEvent.emit(this.scratchpad);
  }
}
