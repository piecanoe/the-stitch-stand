import { useState, useEffect } from 'react';
import { getEvents } from '../api';
import { EventCard } from '../components/EventCard';

const EventsPage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function loadAllEvents() {
      const data = await getEvents();
      data.sort(
        (d1, d2) => new Date(d2.date).getTime() - new Date(d1.date).getTime()
      );
      setEvents(data);
    }
    loadAllEvents();
  }, []);

  return (
    <div className="flex flex-col bg-green-300">
      {events.map((event) => {
        return <EventCard event={event} />;
      })}
    </div>
  );
};

export default EventsPage;
