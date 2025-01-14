import React, { useState } from 'react';
import { Button, Steps, theme } from 'antd';
import dynamic from 'next/dynamic';
const Tutorial = dynamic(() => import('./Tutorial'), { ssr: false });
const Uploader = dynamic(() => import('./Uploader'), { ssr: false });
const Dashboard = dynamic(() => import('./Dashboard'), { ssr: false });

const HomeSteps: React.FC = () => {
  const { token } = theme.useToken() || {
    colorTextTertiary: '#000',
    colorFillAlter: '#fff',
    colorBorder: '#ddd',
    borderRadiusLG: '8px',
  };

  const [current, setCurrent] = useState(0);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false); 

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const submit = (file: any) => {
    if (typeof window === 'undefined') {
      console.error('submit can only run in the browser.');
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    fetch('/api/analyzer', {
      method: 'POST',
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        setStats(data);
      })
      .catch((error) => {
        console.error('Error submitting file:', error);
      })
      .finally(() => setLoading(false));
  };

  const contentStyle: React.CSSProperties = {
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
        {current === 0 && <Tutorial onFileReady={next} />}
        {current === 1 && <Uploader onSubmit={submit} />}
        {current === 2 && (
          stats ? (
            <Dashboard stats={stats} />
          ) : (
            <p>No se encontraron resultados. Inténtalo de nuevo.</p>
          )
        )}
      </div>
      <div style={{ marginTop: 24 }}>
        {current < 2 && (
          <Button
            type="primary"
            onClick={next}
            disabled={current === 1 && (!stats || loading)}
          >
            {loading ? 'Cargando...' : current === 0 ? 'Listo, ya tengo mi chat exportado' : 'Ver Resultados'}
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={prev}>
            Volver
          </Button>
        )}
      </div>
    </>
  );
};

export default HomeSteps;
