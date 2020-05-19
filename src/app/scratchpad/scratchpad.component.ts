import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import Scratchpad from '../Scratchpad';
import StorageService from '../StorageService';
import ScratchpadView from '../ScratchpadView';
import Item from '../Item';
import { LocalStorageService } from '../service/local-storage.service';
import { RemoteStorageService } from '../service/remote-storage.service';


@Component({
  selector: 'app-scratchpad',
  templateUrl: './scratchpad.component.html',
  styleUrls: ['./scratchpad.component.css']
})

export class ScratchpadComponent implements OnInit {

  itemInput: string;
  errorStatus: number;
  scratchpad: Scratchpad;
  storageService: StorageService;
  triedLogin: boolean;
  @Input() scratchpadView: ScratchpadView;
  @Output() removeScratchpadEvent = new EventEmitter<string>();

  constructor(
    public lsService: LocalStorageService,
    public rsService: RemoteStorageService) {}

  ngOnInit(): void {
    this.storageService = this.scratchpadView.remote
      ? this.rsService : this.lsService;
    this.load();
  }

  load() {
    this.storageService.loadScratchpad(this.scratchpadView)
    .then(sp => this.scratchpad = sp)
    .catch(error => {
      console.error('Load', error);
      this.triedLogin = this.errorStatus === 403;
      this.errorStatus = error.status;
    });
  }

  addItem() {
    this.storageService.addItem(this.scratchpadView, this.itemInput)
      .then(item => this.scratchpad.items.unshift(item))
      .catch(error => {
        console.error('AddItem', error);
        this.errorStatus = error.status;
      });
    this.itemInput = '';
  }

  modifyItem(newItem: Item) {
    this.storageService.modifyItem(this.scratchpadView, newItem.id, newItem.content)
      .then(() => this.scratchpad.items.map((item) => {
        if (newItem.id === item.id) {
          item.content = newItem.content;
        }
      }))
      .catch(error => console.error('Modify Item', error));
  }

  removeItem(itemId: number) {
    this.storageService.removeItem(this.scratchpadView, itemId)
      .then(() => {
        this.scratchpad.items = this.scratchpad.items.filter(
          item => item.id !== itemId);
      })
      .catch(error => console.error('Remove Item', error));
  }

  remove() {
    this.storageService.removeScratchpad(this.scratchpadView)
      .then(() => this.removeScratchpadEvent.emit(this.scratchpadView.id))
      .catch(error => {
        console.error('Remove', error);
        this.errorStatus = error.status;
      });
  }

  hide() {
    this.removeScratchpadEvent.emit(this.scratchpadView.id);
  }

  authenticate(pass: string) {
    this.rsService.removeId(this.scratchpadView.id);
    this.rsService.addId(this.scratchpadView.id, pass);
    this.scratchpadView.auth = pass;
    this.load();
  }

  logout() {
    this.rsService.removeId(this.scratchpadView.id);
    this.rsService.addId(this.scratchpadView.id);
    this.scratchpad = undefined;
    this.errorStatus = 403;
  }
}
