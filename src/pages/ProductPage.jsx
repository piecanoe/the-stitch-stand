import React from 'react';
import { useParams } from 'react-router-dom';
import products from '../products';

const ProductPage = () => {
  const { productId } = useParams();
  const product = products.find((product) => product.id === productId);

  if (!product) {
    return <div>Product not found!</div>;
  }
  const reviews = { href: '#', average: 4, totalCount: 117 };

  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    /* Image gallery */
    <div>
      <h1>{product.name}</h1>
      <p>{product.price}</p>
      {/* <img src={product.imageSrc} alt={product.imageAlt} /> */}
      <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
        <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
          <img
            alt={product.imageAlt}
            src={product.imageSrc}
            className="h-full w-full object-cover object-center"
          />
        </div>
        <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              alt={product.imageAlt}
              src={product.imageSrc}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
            <img
              alt={product.imageAlt}
              src={product.imageSrc}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
          <img
            alt={product.imageAlt}
            src={product.imageSrc}
            className="h-full w-full object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
