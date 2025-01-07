import React, { useState } from 'react';
import { Button, Steps, theme } from 'antd';
import Tutorial from './Tutorial';

const steps = [
  {
    title: 'Exportar Chat',
    content: <Tutorial />,
    nextLabel: 'Listo, ya tengo mi chat exportado',
  },
  {
    title: 'Subir Archivo',
    content: 'Second-content',
    nextLabel: 'Ver Resultados',
    previousLabel: 'Volver'
  },
  {
    title: 'Resultados',
    content: 'Last-content',
    previousLabel: 'Volver',
  },
];

const HomeSteps: React.FC = () => {
  const { token } = theme.useToken();
  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

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
      <Steps current={current} items={items} />
      <div style={contentStyle}>{steps[current].content}</div>
      <div style={{ marginTop: 24 }}>
        {steps[current].nextLabel && (
          <Button type="primary" onClick={() => next()}>
            {steps[current].nextLabel}
          </Button>
        )}
        {steps[current].previousLabel && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            {steps[current].previousLabel}
          </Button>
        )}
      </div>
    </>
  );
};

export default HomeSteps;