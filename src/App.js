import React, { useEffect, useState } from 'react';
import './App.css'; // Import CSS file for styling

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://reqres.in/api/users?page=2');
        if (!response.ok) {
          throw new Error('Request failed');
        }
        const json = await response.json();
        setData(json.data);
        setIsLoading(false);
      } catch (error) {
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredData = data.filter((user) =>
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="app">
      <h1>User List</h1>
      <div className="search-container">
        <input
          className="search-box"
          type="text"
          placeholder="Search by first name"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="list-view">
        {filteredData.map((user) => (
          <div className="list-item" key={user.id}>
            <img className="avatar" src={user.avatar} alt={`Avatar of ${user.first_name}`} />
            <div className="user-details">
              <div className="user-id">{user.id}</div>
              <div className="user-name">{user.first_name}</div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2>❤️ Build by Jyoti KM </h2>
        <h2><a href='https://drive.google.com/file/d/1MyV7Vwj1uCC55jh3s_ZyoFowDeONmpTm/view?usp=sharing'>Resume Link</a></h2>
        <h2><a href='https://jyoti-km.vercel.app/'>Portfolio</a></h2>
      </div>
      
    </div>
  );
};

export default App;
