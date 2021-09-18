import * as React from 'react';

import { ContextState } from '../types/Context';
import { parseCurrency } from '../utils/parseCurrency';
import Link from 'next/link';
import { DataContext } from '../context';
import CartItem from './CartItem';

interface ISidebarProps { }

const Sidebar: React.FunctionComponent<ISidebarProps> = () => {

  const { isOpenSidebar, setOpenSidebar, cart, getItemsFromLocalStorage } = React.useContext<ContextState>(DataContext);
  const closeSideBarCart = () => isOpenSidebar ? setOpenSidebar(false) : setOpenSidebar(true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getItemsFromLocalStorage(), []);

  const completeMessage = React.useMemo(() => {
    return cart
      .reduce((message, product) => message.concat(`* ${product.title} - ( X${product.quantity} ) - ${parseCurrency(product.price * product.quantity)}\n`), ``)
      .concat(`\nTotal ${parseCurrency(cart.reduce((total, product) => total + product.price * product.quantity, 0))}`);
  }, [cart]);

  return (
    <div className="fixed inset-0 overflow-hidden z-40" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
          <div className="w-screen max-w-md">
            <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
              <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                <div className="flex products-start justify-between">
                  <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                    Tu carrito de compras
                  </h2>
                  <div className="ml-3 h-7 flex products-center">
                    <button onClick={closeSideBarCart} type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Close panel</span>
                      <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {
                        cart && cart.length > 0 ? (
                          cart.map(product => (
                            <CartItem key={product.id} product={product}/>
                          ))
                        ) : <div className="text-center mt-10 text-sm text-gray-500">No hay productos en tu carrito</div>
                      }
                    </ul>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>{parseCurrency(cart.reduce((total, item) => item.price*item.quantity + total, 0))}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">Continuarás tu pedido por Whatsapp</p>
                <Link passHref href={`https:wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(completeMessage)}`} >
                  <div className="cursor-pointer mt-6 flex justify-center products-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-green-600 hover:bg-green-700">
                    Comprar
                  </div>
                </Link>
                <div onClick={closeSideBarCart} className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    o <button type="button" className="text-green-600 font-medium hover:text-green-500">Seguir comprando<span aria-hidden="true"> &rarr;</span></button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
