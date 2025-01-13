import React from 'react';
import { Button, Tabs } from 'antd';
import { AndroidOutlined, AppleOutlined, CheckCircleOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import IOSTutorial from '@/components/tutorials/IOSTutorial';
import AndroidTutorial from '../tutorials/AndroidTutorial';
import Paragraph from 'antd/es/typography/Paragraph';

interface TutorialProps {
  onFileReady: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onFileReady }) => {

  const tabs = [
    {
      key: '1',
      label: 'Android',
      icon: <AndroidOutlined />,
      children: <AndroidTutorial/>,
    },
    {
      key: '2',
      label: 'Apple',
      icon: <AppleOutlined />,
      children: <IOSTutorial />,
    },
  ];

  return (
    <>
      <Title level={3}>Exportar tu chat de WhatsApp</Title>
      <Title level={5}>
        Para poder analizar tu chat de WhatsApp, primero necesitas exportarlo
      </Title>
      <Paragraph>
        Ya tienes tu chat exportado? Haz clic en el botón de abajo para continuar
      </Paragraph>
      <Button type='primary' style={{ marginBottom: '20px', marginTop: '10px' }} onClick={onFileReady}>
        <CheckCircleOutlined />
        Continuar
      </Button>
      <Paragraph>
        Si aún no tienes tu chat exportado, sigue los siguientes pasos:
      </Paragraph>
      <Tabs
        defaultActiveKey="2"
        items={tabs}
      />
    </>

  );
};

export default Tutorial;