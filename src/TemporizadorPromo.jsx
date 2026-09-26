import { useState, useEffect } from 'react';

const handleInputChange = (e) => {
  const valor = parseInt(e.target.value, 10);
  if (!isNaN(valor) && valor >= 0) {
    setSegundos(valor);
  }
};

function TemporizadorPromo({ activo }) {
  const [segundos, setSegundos] = useState(30);

  useEffect(() => {
    let timer = null;
    if (activo) {
      timer = setInterval(() => {
        setSegundos(segundos - 1);
      }, 1000);
    }
  }, [segundos]);



  return (
    <div style={{ color: 'crimson', fontWeight: 'bold' }}>
      Tiempo para aplicar Combo Descuento: {segundos}s
      <input type="text" placeholder="Ingrese el tiempo" onChange={handleInputChange} />
    </div>
  );
}