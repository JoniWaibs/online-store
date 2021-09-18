import * as React from 'react';
import { Product } from '../types/Product';
import Image from 'next/image'
import { ContextState } from '../types/Context';
import { DataContext } from '../context';
import { calculateQuantity } from '../utils/calculateQuantity';
import { parseCurrency } from '../utils/parseCurrency';

interface ICartItemProps {
  product: Product
}

const CartItem: React.FunctionComponent<ICartItemProps> = ({ product }) => {

  const { image, id, quantity, title, price } = product;
  const { INCREASE, DECREASE } = calculateQuantity;
  const { deleteItemCart, handleQuantity } = React.useContext<ContextState>(DataContext);

  return (
    <li className="py-6 flex" >
      <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
        <Image
          src={image}
          alt={title}
          className="w-full h-full object-center object-cover"
          width={75}
          height={75}
        />
      </div>
      <div className="ml-4 flex-1 flex flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>{title}</h3>
            <p className="ml-4">
              {parseCurrency(price*quantity)}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-row space-x-2 w-full items-center rounded-lg my-3">
              <button onClick={() => handleQuantity(id, DECREASE)} className="focus:outline-none bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-full inline-flex items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 12H6" />
                </svg>
              </button>
              <p>{quantity}</p>
              <button onClick={() => handleQuantity(id, INCREASE)} className="focus:outline-none bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-2 rounded-full inline-flex items-center ">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </button>
            </div>
            <div className="flex-1 flex products-end justify-between text-sm">
              <div className="flex" onClick={() => deleteItemCart(id)}>
                <button type="button" className="font-medium text-green-600 hover:text-green-500">Eliminar</button>
              </div>
            </div>
          </div>
        </div>
        {/* <small className="mt-0.5 text-gray-500">Aun quedan {product.stock} unidades.</small> */}
      </div>
    </li>
  )
};

export default CartItem;
