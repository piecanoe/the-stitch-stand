import { useState } from 'react';
import { CreateUser } from '../components/CreateUser';
import { Login } from '../components/Login';

export default function LoginPage() {
  //view == 0 --> Login
  //view == 1 --> Create
  const [view, setView] = useState(0);

  return (
    <>
      {!view ? (
        <>
          <Login />
          <button onClick={() => setView(!view)}>Create New Account</button>
        </>
      ) : (
        <>
          <CreateUser />
          <button onClick={() => setView(!view)}>
            Login to exiting account
          </button>
        </>
      )}
    </>
  );
}
