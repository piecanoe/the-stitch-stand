import React from 'react';
import EventPreview from '../components/EventPreview';

const EventsPage = () => {
  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-semibold pb-8">Upcoming Events</h2>
        <EventPreview
          name="The Frogtown Flea Crawl"
          date="Saturday, October 28, 2024"
          img="https://marianainla.com/wp-content/uploads/2023/10/unnamed-3-5-833x1024.jpg"
        />
        <EventPreview
          name="Anime Expo"
          date="Friday, July 3, 2024"
          img="https://www.unionarena-tcg.com/na/images/events/anime_expo/2024/img_mv_sp.jpg?v3"
        />
        <EventPreview
          name="Echo Park Farmer's Market"
          date="Sunday, May 5, 2024"
          img="https://cdn2.allevents.in/thumbs/thumb665ca29b471bd.jpg"
        />
      </div>
    </div>
  );
};

export default EventsPage;
