import React from 'react';
import { Link } from 'react-router-dom';
import CategoryPreview from '../components/CategoryPreview';

export default function HomePage() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-xl py-10">
          Hi there! We are an alteration and apparel shop that operates ate
          local flea markets around Los Angeles. Check out our{' '}
          <Link to="/events">events</Link> page to see where we'll be next!
        </h1>
        <img
          className="object-fill"
          src="https://blog.uberprints.com/content/images/2023/05/cutsom-t-shirt-design-trends-2023-header-1.jpg"
        />
        <CategoryPreview category="Tops" />
        <CategoryPreview category="Bottoms" />
        <CategoryPreview category="Bolo Ties" />
      </div>
    </div>
  );
}
