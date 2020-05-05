import Item from './Item';

export default interface Scratchpad {
  id: number;
  name: string;
  items: Array<Item>;
  active?: boolean;
}
