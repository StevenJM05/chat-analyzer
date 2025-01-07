import React from 'react';
import { Button, message, Steps, Tabs, theme } from 'antd';
import { AndroidOutlined, AppleOutlined } from '@ant-design/icons';
import Title from 'antd/es/typography/Title';
import IOSTutorial from 'Steven/components/tutorials/IOSTutorial';

const Tutorial: React.FC = () => {

  const tabs = [
    {
      key: '1',
      label: 'Android',
      icon: <AndroidOutlined />,
      children: 'Android',
    },
    {
      key: '2',
      label: 'Apple',
      icon: <AppleOutlined />,
      children: <IOSTutorial />,
    },
  ];

  return (
    <div>
      <Title level={3}>Como Exportar tu chat de WhatsApp</Title>
      <Tabs
        defaultActiveKey="2"
        items={tabs}
      />
    </div>

  );
};

export default Tutorial;