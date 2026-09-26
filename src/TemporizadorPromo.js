import { useState, useEffect } from 'react';

function TemporizadorPromo({ activo }) {
  const [segundos, setSegundos] = useState(30);

  const handleInputChange = (e) => {
    const valor = parseInt(e.target.value, 10);

    if (!isNaN(valor) && valor >= 0) {
      setSegundos(valor);
    }
  };

  useEffect(() => {
    if (!activo || segundos <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSegundos((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [activo, segundos]);

  return (
    <div style={{ color: 'crimson', fontWeight: 'bold' }}>
      Tiempo para aplicar Combo Descuento: {segundos}s

      <input
        type="text"
        placeholder="Ingrese el tiempo"
        onChange={handleInputChange}
        style={{ marginLeft: '10px' }}
      />
    </div>
  );
}

export default TemporizadorPromo;
