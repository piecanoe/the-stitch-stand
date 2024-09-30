import React from 'react';

export const EventCard = ({ event }) => {
  // let date = new Date(event.date);
  // let stringDate = date.toString();

  return (
    <div className="m-4 p-4 bg-blue-300 hover:bg-red-300 cursor-pointer rounded-md">
      <img src={event.imageId} />
      <h1>{event.name}</h1>
      {/* <h2>{stringDate.slice(4, 15)}</h2> */}
      <h2>{event.date}</h2>
    </div>
  );
};
