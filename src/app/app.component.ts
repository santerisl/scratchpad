import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from './service/local-storage.service';
import { RemoteStorageService } from './service/remote-storage.service';
import StorageService from './StorageService';

interface ScratchpadId {
  id: string;
  remote: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'scratchpad';
  scratchpadInput: string;
  remoteInput: boolean;
  scratchpadIds: ScratchpadId[];

  // localIds: string[];
  // remoteIds: string[];

  constructor(
    public lsService: LocalStorageService,
    public rsService: RemoteStorageService) {}

  ngOnInit() {
    this.scratchpadIds = [
      ...this.lsService.getIds().map(id => ({id, remote: false})),
      ...this.rsService.getIds().map(id => ({id, remote: true}))
    ];
  }

  addScratchpad() {
    const storage: StorageService = this.remoteInput ? this.rsService : this.lsService;
    storage.createScratchpad(this.scratchpadInput)
      .then((id: string) => this.scratchpadIds.push({id, remote: this.remoteInput}))
      .catch(error => console.error('Add', error));
    this.scratchpadInput = '';
  }

  remove(id: string) {
    this.scratchpadIds = this.scratchpadIds.filter(other => other.id !== id);
  }
}
