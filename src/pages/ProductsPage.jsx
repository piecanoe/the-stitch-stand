import { useState, useEffect } from 'react';
import { getProducts } from '../api';

import { useSearchParams } from 'react-router-dom';
import { ProductCard } from '../components/ProductCard';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const typeFilter = searchParams.get('category');

  const displayedProducts = typeFilter
    ? products.filter(
        (product) => product.category.toLowerCase() === typeFilter
      )
    : products;

  const handleFilterChange = (key, value) => {
    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      if (value === null) {
        newParams.delete(key);
      } else {
        newParams.set(key, value);
      }
      return newParams;
    });
  };

  useEffect(() => {
    async function loadAllProducts() {
      const data = await getProducts();
      setProducts(data);
    }
    loadAllProducts();
  }, []);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
          <h2 className="text-2xl font-semibold pb-8">All Products</h2>
          <div className="flex-1 flex space-x-4 pb-8">
            <button
              className={`hover:bg-green-500 p-2 rounded ${typeFilter === 'tops' ? `bg-green-400` : ''}`}
              onClick={() => handleFilterChange('category', 'tops')}
            >
              Tops
            </button>
            <button
              className={`hover:bg-green-500 p-2 rounded ${typeFilter === 'bottoms' ? `bg-green-400` : ''}`}
              onClick={() => handleFilterChange('category', 'bottoms')}
            >
              Bottoms
            </button>
            <button
              className={`hover:bg-green-500 p-2 rounded ${typeFilter === 'bolo ties' ? `bg-green-400` : ''}`}
              onClick={() => handleFilterChange('category', 'bolo ties')}
            >
              Bolo Ties
            </button>
            {typeFilter ? (
              <button
                className="hover:bg-green-500 p-2 rounded"
                onClick={() => handleFilterChange('category', null)}
              >
                Clear Filter
              </button>
            ) : null}
          </div>

          <section className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {displayedProducts.map((product) => {
              return <ProductCard product={product} />;
            })}
          </section>
        </div>
      </div>
      ;
    </>
  );
};

export default ProductsPage;
