import { GetStaticProps } from 'next';
import * as React from 'react';
import ProductCard from "../components/ProductCard";
import BannerCart from '../components/BannerCart';
import Sidebar from '../components/Sidebar';
import { Product } from '../types/Product';
import { ContextState } from '../types/Context';
import { DataContext } from '../context';

const api = require('../api');

interface IndexRouteProps {
  products: Product[];
};

const IndexRoute: React.FunctionComponent<IndexRouteProps> = ({ products }) => {

  const { isOpenSidebar, cart, addToCart, getItemsFromLocalStorage  } = React.useContext<ContextState>(DataContext);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  React.useEffect(() => getItemsFromLocalStorage(), []);

  return (
    <div className="w-5/6 mx-auto h-auto">
      { isOpenSidebar && <Sidebar/> }
      <div className="bg-white">
        <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {
              products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                />
              ))
            }
          </div>
        </div>
        { Boolean(cart && cart.length) ? (<BannerCart productsLength={cart.length}/>) : null }
      </div>
    </div>
  )
};

export const getStaticProps: GetStaticProps = async () => {
  const products = await api.list();

  if (!products && products.length <= 0) {
    return {
      notFound: true
    }
  }
  return {
    props: {
      products,
    },
    revalidate: 10
  }
};


export default IndexRoute;
