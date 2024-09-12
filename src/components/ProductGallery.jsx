import React from 'react';

export const ProductGallery = ({ product }) => {
  return (
    <>
      {product.images && product.images.length > 0 && (
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            {product.images[0] && (
              <img
                alt={product.images[0].alt}
                src={product.images[0].src}
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              {product.images[1] && (
                <img
                  alt={product.images[1].alt}
                  src={product.images[1].src}
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              {product.images[2] && (
                <img
                  alt={product.images[2].alt}
                  src={product.images[2].src}
                  className="h-full w-full object-cover object-center"
                />
              )}
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            {product.images[3] && (
              <img
                alt={product.images[3].alt}
                src={product.images[3].src}
                className="h-full w-full object-cover object-center"
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};
