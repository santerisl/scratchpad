import Item from './Item';

export default interface Scratchpad {
  id: string;
  name: string;
  items: Array<Item>;

  itemCount?: number;
  active?: boolean;
}
