import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api';

export default function CreateEventPage() {
  const [name, setName] = useState('');
  const [img, setImg] = useState('');

  let user = sessionStorage.getItem('User');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/events');
    }
  }, [user]);

  async function handleSubmit() {
    let submitObject = {
      name: name,
      img: img,
      date: new Date(),
    };

    await createEvent(submitObject);
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Event Name:</label>
      <input
        onChange={(e) => setName(e.target.value)}
        maxLength={100}
        required
        name="name"
      />
      <label>Image src</label>
      <input
        onChange={(e) => setImg(e.target.value)}
        maxLength={5000}
        required
        name="img"
      />
      <button type="submit">Submit</button>
    </form>
  );
}
