import React from 'react';

const EventPreview = ({ name, date, img }) => {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-4 sm:px-6 sm:py-15 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-3 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 ">
          <img
            className="h-50 w-50 object-cover object-center group-hover:opacity-75 rounded-lg"
            src={img}
          />
          <h2>{name}</h2>
          <h3>{date}</h3>
        </div>
      </div>
    </div>
  );
};

export default EventPreview;
