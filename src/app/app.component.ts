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
  scratchpadInput: string;
  scratchpads: Scratchpad[];
  id = 0;

  constructor(private lsService: LocalStorageService) {
    this.scratchpads = lsService.getItem('scratchpads') || Array<Scratchpad>();
  }

  @HostListener('window:beforeunload')
  beforeUnload() {
    this.lsService.setItem('scratchpads', this.scratchpads);
  }

  addScratchpad() {
    this.scratchpads.push({
      id: this.id,
      itemCount: 0,
      name: this.scratchpadInput,
      items: []
    });
    this.scratchpadInput = '';
    this.id++;
  }

  remove(scratchpad: Scratchpad) {
    this.scratchpads = this.scratchpads.filter(other => scratchpad !== other);
  }
}
