import React, { useState } from 'react';
import { Button, Steps, theme } from 'antd';
import Tutorial from './Tutorial';
import Uploader from './Uploader';
import Dashboard from './Dashboard';

const HomeSteps: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);
  const [stats, setStats] = useState<any>(null);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const submit = (file: any) => {
    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/analyzer', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
      });
  };

  const contentStyle: React.CSSProperties = {
    lineHeight: '260px',
    textAlign: 'center',
    color: token.colorTextTertiary,
    backgroundColor: token.colorFillAlter,
    borderRadius: token.borderRadiusLG,
    border: `1px solid ${token.colorBorder}`,
    marginTop: 16,
    padding: 24,
  };

  return (
    <>
      <Steps
        current={current}
        items={[
          { title: 'Exportar Chat' },
          { title: 'Subir Archivo' },
          { title: 'Resultados' },
        ]}
      />
      <div style={contentStyle}>
        {current === 0 && <Tutorial />}
        {current === 1 && <Uploader onSubmit={submit} />}
        {current === 2 && stats && <Dashboard stats={stats} />}
      </div>
      <div style={{ marginTop: 24 }}>
        {current < 2 && ( // Mostrar botón "Siguiente" solo si no está en el último paso
          <Button
            type="primary"
            onClick={next}
            disabled={current === 1 && !stats} // Deshabilitar si está en el paso 2 y aún no hay datos
          >
            {current === 0 ? 'Listo, ya tengo mi chat exportado' : 'Ver Resultados'}
          </Button>
        )}
        {current > 0 && ( // Mostrar botón "Volver" solo si no está en el primer paso
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Volver
          </Button>
        )}
      </div>
    </>
  );
};

export default HomeSteps;
