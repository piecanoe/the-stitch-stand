import { useState, useEffect } from 'react';

import * as jwt_decode from 'jwt-decode';

export default function UserPage() {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function loadUserData() {
      const token = sessionStorage.getItem('User');
      const decodedUser = jwt_decode.jwtDecode(token);
      setUser(decodedUser);
    }
    loadUserData();
  }, []);

  return (
    <>
      <label>Name:</label>
      <h2>{user.name}</h2>
      <label>Email:</label>
      <h2>{user.email}</h2>
      <label>Join Date:</label>
      <h2>{user.joinDate}</h2>
    </>
  );
}
