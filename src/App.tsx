import { useEffect,useState } from 'react'
import './App.css'

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null); 

  useEffect(()=>{
    const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      if(!response){
        throw new Error(`HTTP Error! status : ${response.status}`);
      }
      const data : user[] = await response.json();
      setUsers(data);
    } catch (error) {
      setError((error as Error).message);
    }
    }

    fetchData();
  },[])

  return (
    <div>
      <h1>User List with docker</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App
