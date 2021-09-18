import * as React from 'react';
import {ContextState} from '../types/Context'
import { Product } from '../types/Product';
import { calculateQuantity } from '../utils/calculateQuantity';


const contextDefaultValues: ContextState = {
  isOpenSidebar: false,
  setOpenSidebar: () => {},
  cart: [],
  addToCart: () => {},
  getItemsFromLocalStorage: () => {},
  deleteItemCart: () => {},
  handleQuantity: () => {},
}

interface IContextProps {
  children: JSX.Element | JSX.Element[]
}

export const DataContext = React.createContext<ContextState>(contextDefaultValues);

const AppContext: React.FunctionComponent<IContextProps> = ({ children }) => {

  const [cart, setCart] = React.useState<Product[]>(contextDefaultValues.cart);
  const [isOpenSidebar, setOpenSidebar] = React.useState<boolean>(contextDefaultValues.isOpenSidebar);

  const addToCart = (product) => {
    const result = cart.some(item => item ? item.id === product.id : null)
    if (result) {
      return;
    }
    product.quantity = 1
    setCart([...cart, product])
    localStorage.setItem('cart', JSON.stringify([...cart, product]))
  };

  const getItemsFromLocalStorage = () => {
    const getCart = JSON.parse(localStorage.getItem('cart')) as Product[] || [];
    setCart(getCart)
  };

  const deleteItemCart = (id: string) => {
    if (cart.some(item => item.id === id)) {
      const mappedCart = cart.filter(item => item.id !== id)
      localStorage.setItem('cart', JSON.stringify(mappedCart))
    }
    getItemsFromLocalStorage()
  };

  const handleQuantity = (id: string, type: string) => {
    const { INCREASE, DECREASE } = calculateQuantity
    if (cart.some(item => item.id === id)) {
      if(type === INCREASE) cart.forEach( product => product.id === id ? product.quantity++ : null)
      if(type === DECREASE) cart.forEach( product => product.id === id ? product.quantity-- : null)
      localStorage.setItem('cart', JSON.stringify(cart))
    }
    getItemsFromLocalStorage()
  };

  React.useEffect(() => cart.length <= 0 ? setOpenSidebar(false) : null, [cart]);

  React.useEffect(() => {
    const deleteWhenQuantityIsCero = () => {
      const mappedCart = cart.find( product => product.quantity === 0)
      if(mappedCart) deleteItemCart(mappedCart.id)
    }
    deleteWhenQuantityIsCero()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  return (
    <DataContext.Provider
      value={{
        isOpenSidebar,
        setOpenSidebar,
        cart,
        addToCart,
        getItemsFromLocalStorage,
        deleteItemCart,
        handleQuantity,
      }}>
      { children }
    </DataContext.Provider>
  );
};

export default AppContext;
