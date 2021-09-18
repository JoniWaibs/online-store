import * as React from 'react';
import Image from 'next/image'
import { parseCurrency } from '../utils/parseCurrency'
import { calculateDiscount } from '../utils/calculateDiscount'
import { Product } from '../types/Product';


interface IProductCardProps {
  product: Product;
  addToCart: Function;
}

const ProductCard: React.FunctionComponent<IProductCardProps> = ({ product, addToCart }) => {

  const { image, title, price, stock, discount, new_price } = product;
  const isDiscountApplied = calculateDiscount(price, discount, new_price);

  return (
    <div className="group border border-gray-300 rounded-md p-2 bg-gray-200">
      <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
        <Image
          layout="fill"
          src={image}
          alt="Tall slender porcelain bottle with natural clay textured body and cork stopper."
          className="w-full h-full object-center object-cover group-hover:opacity-75"
        />
      </div>
      <h3 className="mt-4 text-sm text-gray-700 capitalize">
        {title}
      </h3>
      <div className="flex justify-start gap-1 w-full h-8">
        {isDiscountApplied
          ?
          (
            <>
              <p className="text-lg font-medium text-gray-900">
                {parseCurrency(new_price)}
              </p>
              <div className="h-10">
                <small className="text-blue-700 bg-blue-200 px-1 rounded">{discount}% OFF</small>
              </div>
            </>
          )
          :
          <p className="text-lg font-medium text-gray-900">
            {parseCurrency(price)}
          </p>
        }
      </div>
      <div className="w-full p-1 flex justify-center">
        <button onClick={() => addToCart(product)} className="text-white bg-green-600 hover:bg-green-700 p-2 text-center w-full rounded-md font-sans tracking-wide">Agregar al carrito</button>
      </div>
    </div>
  );
};

export default ProductCard;
