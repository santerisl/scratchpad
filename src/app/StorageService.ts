import Scratchpad from './Scratchpad';
import Item from './Item';
import ScratchpadView from './ScratchpadView';

export default interface StorageService {
  createScratchpad(name: string, auth?: string): Promise<string>;
  loadScratchpad(id: ScratchpadView): Promise<Scratchpad>;
  removeScratchpad(id: ScratchpadView): Promise<void>;

  addItem(id: ScratchpadView, content: string): Promise<Item>;
  removeItem(id: ScratchpadView, itemId: number): Promise<void>;
  modifyItem(id: ScratchpadView, itemId: number, content: string): Promise<void>;

  getIds(): ScratchpadView[];
}
