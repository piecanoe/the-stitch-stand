import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createEvent } from '../api';

export default function CreateEventPage() {
  const [name, setName] = useState('');
  const [file, setFile] = useState();

  const MAX_FILE_SIZE = 15000000;

  const inputFile = useRef(null);

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
      date: new Date(),
      file: file,
    };

    await createEvent(submitObject);
  }

  function handleFileUpload(e) {
    const file = e.target.files[0];

    const fileExtension = file.name.substring(file.name.lastIndexOf('.'));
    if (
      fileExtension != '.jpg' &&
      fileExtension != '.jpg' &&
      fileExtension != '.png'
    ) {
      alert('File must be jpg or png');
      inputFile.current.value = '';
      inputFile.current.type = 'file';
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      alert('File size exceeds the limit (15Mb');
      inputFile.current.value = '';
      inputFile.current.type = 'file';
      return;
    }

    setFile(file);
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
      <label>Image</label>
      <input type="file" onChange={handleFileUpload} ref={inputFile} required />
      <button type="submit">Submit</button>
    </form>
  );
}
