import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('Carregando...');

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api`)
      .then(response => {
        if (!response.ok) {
          throw new Error("Erro ao buscar a mensagem do backend");
        }
        return response.json();
      })
      .then(data => setMessage(data.message))
      .catch(error => {
        console.error("Erro:", error);
        setMessage("Não foi possível conectar ao backend");
      });
  }, []);

  return (
    <div className="App">
      <h1>Frontend React App</h1>
      <h2>Backend Message:</h2>
      <p>{message}</p>
    </div>
  );
}

export default App;
