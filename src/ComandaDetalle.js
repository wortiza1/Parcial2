import { useState } from 'react';

function ComandaDetalle({ items, totalVisualRef, onCobrarOrden }) {
  const [itemsLocales, setItemsLocales] = useState(items);

  const aplicarCortesia = (index) => {
    setItemsLocales((prev) =>
      prev.map((item, idx) =>
        idx === index ? { ...item, precio: 0 } : item
      )
    );

    alert(`Cortesía aplicada al producto: ${itemsLocales[index].nombre}`);
  };

  return (
    <section
      style={{
        margin: '20px 0',
        border: '1px dashed gray',
        padding: '16px'
      }}
    >
      <h3>Comanda en Proceso</h3>

      <ul>
        {itemsLocales.length === 0 ? (
          <li>No hay productos agregados</li>
        ) : (
          itemsLocales.map((item, idx) => (
            <li key={idx} style={{ marginBottom: '6px' }}>
              {item.nombre} — Q{item.precio}

              <button
                onClick={() => aplicarCortesia(idx)}
                style={{ marginLeft: '10px' }}
              >
                Marcar Cortesía
              </button>
            </li>
          ))
        )}
      </ul>

      <div style={{ fontSize: '1.2rem', marginTop: '10px' }}>
        <strong>
          Total a Cobrar: Q{totalVisualRef.current}
        </strong>
      </div>

      <button
        onClick={onCobrarOrden}
        style={{
          marginTop: '12px',
          padding: '10px 16px',
          background: 'green',
          color: 'white'
        }}
      >
        Cobrar y Enviar a Cocina
      </button>
    </section>
  );
}

export default ComandaDetalle;
