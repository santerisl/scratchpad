import { Component, HostListener } from '@angular/core';
import Scratchpad from './Scratchpad';
import { LocalStorageService } from './local-storage.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'scratchpad';
  scratchpads: Scratchpad[];
  id = 0;

  constructor(private lsService: LocalStorageService) {
    this.scratchpads = lsService.getItem('scratchpads') || Array<Scratchpad>();
  }

  @HostListener('window:beforeunload')
  beforeunloadHandler() {
    this.lsService.setItem('scratchpads', this.scratchpads);
  }

  addScratchpad() {
    this.scratchpads.push({
      id: this.id,
      name: getLine(),
      items: []
    });
    this.id++;
  }

  remove(scratchpad: Scratchpad) {
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

export function getLine(): string {
  return lines[Math.floor(Math.random() * lines.length)];
}
