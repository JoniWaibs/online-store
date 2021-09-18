import * as React from 'react';
import  { DataContext } from '../context'
import { ContextState } from '../types/Context';

interface IBannerCartProps {
  productsLength: number
}

const BannerCart: React.FunctionComponent<IBannerCartProps> = ({productsLength}) => {

  const { isOpenSidebar, setOpenSidebar } = React.useContext<ContextState>(DataContext);
  const showSideBarCart = () => isOpenSidebar ? setOpenSidebar(false) : setOpenSidebar(true);

  return(
    <div className="bg-green-600 -inset-x-px left-0 sticky bottom-0 h-16 w-full">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="w-0 flex-1 flex items-center">
              <span className="hidden md:flex p-2 rounded-lg bg-green-800">
                <svg className="h-6 w-6 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="hidden md:inline">
                  Tu carrito contiene {productsLength} productos!
                </span>
              </p>
            </div>
            <div className="flex-shrink-0 w-full sm:mt-0 md:w-auto flex items-center justify-center">
              <button onClick={showSideBarCart} className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-green-600 bg-white">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Ver Carrito <span className="md:hidden ml-2 bg-green-600 text-white  px-2 rounded-full">{productsLength} </span>
              </button>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BannerCart;
