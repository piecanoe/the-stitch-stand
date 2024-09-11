import React from 'react';
import { Link } from 'react-router-dom';

export const ProductCard = ({ product }) => {
  return (
    <div>
      <Link key={product._id} to={`/products/${product._id}`} className="group">
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7">
          {/* <img
                    src={product.images[0].src}
                    alt={product.images[0].alt}
                    className="h-full w-full object-cover object-center group-hover:opacity-75"
                  /> */}
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
        <p className="mt-1 text-lg font-medium text-gray-900">
          ${product.price}
        </p>
      </Link>
    </div>
  );
};
