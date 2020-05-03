import { Component } from '@angular/core';


interface Scratchpad {
  id: number;
  name: string;
  items: Array<Item>;
  active?: boolean;
}

interface Item {
  time: Date;
  content: string;
  active?: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'scratchpad';
  scratchpads = Array<Scratchpad>();
  id = 0;

  addItem(scratchpad: Scratchpad) {
    scratchpad.items.unshift({
        time: new Date(),
        content: getLine()});
  }

  removeItem(scratchpad: Scratchpad, item: Item) {
    scratchpad.items = scratchpad.items.filter(other => item !== other);

  }

  addScratchpad() {
    this.scratchpads.push({
      id: this.id,
      name: getLine(),
      items: []});
    this.id++;
  }

  removeScratchpad(scratchpad: Scratchpad) {
    this.scratchpads = this.scratchpads.filter(other => scratchpad !== other);
  }
}

const lines = [
  'Non incididunt dolor aliqua incididunt nulla consectetur eu anim excepteur esse qui est mollit.',
  'Voluptate id mollit anim officia.',
  'Ex dolor proident mollit consectetur dolore pariatur nisi mollit.',
  'Ex Lorem id sit aute sit dolor nostrud ad.',
  'In dolore esse ipsum fugiat ex anim laborum.',
  'Sunt consequat occaecat nulla velit id nisi magna esse.',
  'Sit irure consequat in reprehenderit irure exercitation dolore quis culpa minim qui duis est culpa.',
  'Esse voluptate laboris cillum do.'
];

function getLine(): string {
  return lines[Math.floor(Math.random() * lines.length)];
}
