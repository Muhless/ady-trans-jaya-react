import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/ping')
      .then((res) => res.json())
      .then((json) => setData(json.message))
      .catch((err) => console.error("API Error:", err));
  }, []);

  return (
    <div>
      <h1>API Response: {data}</h1>
    </div>
  );
}

export default App;
