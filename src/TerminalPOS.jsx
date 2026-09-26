import { useState, useReducer, useRef } from 'react';
import ComandaDetalle from './ComandaDetalle';
import TemporizadorPromo from './TemporizadorPromo';

const MENU_INICIAL = [
  { id: 'h1', nombre: 'Hamburguesa Doble', precio: 45 },
  { id: 'p1', nombre: 'Papas Supremas', precio: 20 },
  { id: 'b1', nombre: 'Bebida Mediana', precio: 12 },
];

const facturasReducer = (state, action) => {
  switch (action.type) {
    case 'GUARDAR_VENTA': {
      const nuevaFactura = {
        idFactura: Math.floor(Math.random() * 100000),
        items: action.payload.items,
        total: action.payload.total,
        emitidoEl: new Date().toLocaleTimeString()
      };

      const nuevoEstado = [...state, nuevaFactura];

      localStorage.setItem(
        'cierre_caja',
        JSON.stringify(nuevoEstado)
      );

      return nuevoEstado;
    }

    case 'REINICIAR_TURNO':
      return [];

    default:
      return state;
  }
};

export const TerminalPOS = () => {
  const [pedidoActual, setPedidoActual] = useState([]);
  const [turnoAbierto, setTurnoAbierto] = useState(true);

  const [cierreCaja, dispatch] = useReducer(facturasReducer, []);
  const montoCobradoVisualRef = useRef(0);

  const handleAgregarProducto = (producto) => {
    setPedidoActual((prev) => [...prev, producto]);
    montoCobradoVisualRef.current += producto.precio;
  };

  const handleCompletarOrden = () => {
    if (pedidoActual.length === 0) return;

    dispatch({
      type: 'GUARDAR_VENTA',
      payload: {
        items: pedidoActual,
        total: montoCobradoVisualRef.current
      }
    });

    setPedidoActual([]);
    montoCobradoVisualRef.current = 0;
  };

  return (
    <div
      style={{
        fontFamily: 'monospace',
        padding: '24px',
        maxWidth: '800px'
      }}
    >
      <header
        style={{
          borderBottom: '2px solid black',
          paddingBottom: '12px'
        }}
      >
        <h2>Terminal POS: Estación #1</h2>

        <TemporizadorPromo activo={turnoAbierto} />
      </header>

      <section style={{ marginTop: '16px' }}>
        <h3>Catálogo</h3>

        {MENU_INICIAL.map((item) => (
          <button
            key={item.id}
            onClick={() => handleAgregarProducto(item)}
            style={{
              marginRight: '8px',
              padding: '8px 12px',
              cursor: 'pointer'
            }}
          >
            + {item.nombre} (Q{item.precio})
          </button>
        ))}
      </section>

      <ComandaDetalle
        items={pedidoActual}
        totalVisualRef={montoCobradoVisualRef}
        onCobrarOrden={handleCompletarOrden}
      />

      <section>
        <h3>
          Cierre de Turno (Facturas Generadas: {cierreCaja.length})
        </h3>

        <ul>
          {cierreCaja.map((factura) => (
            <li key={factura.idFactura}>
              Ticket #{factura.idFactura} — Total: Q{factura.total}{' '}
              ({factura.emitidoEl})
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TerminalPOS;