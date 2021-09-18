import { Product } from "./Product";

export type ContextState = {
  isOpenSidebar: boolean,
  setOpenSidebar: (value: boolean) => void,
  cart: Product[],
  addToCart:  (value: Product[]) => void,
  getItemsFromLocalStorage: () => void,
  deleteItemCart: (id: string) => void,
  handleQuantity: (id: string, type: string) => void,
}