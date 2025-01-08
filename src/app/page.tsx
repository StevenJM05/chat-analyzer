'use client';
import React from "react";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { Alert, Button, Card, Col, Modal, Row, Space } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import { FireOutlined } from "@ant-design/icons";
import HomeSteps from "../components/home/Steps";
import Chart from 'react-apexcharts';

const demoChart1 = {
  series: [
    {
      name: 'Mensajes',
      data: [30, 40, 45, 50, 49, 60, 70, 91, 125],
    }
  ],
  options: {
    xaxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep'],
    },
  },
}

const demoChart2 = {
  series: [44, 55, 13],
  options: {
    labels: ['Alex', 'John', 'Doe'],
  },
}

const Home = () => {

  const [showSteps, setShowSteps] = React.useState(false);

  return (
    <div>
      <div style={{ maxWidth: 1200, margin: "50px auto", padding: "20px" }}>
        <Row gutter={40}>
          <Col span={showSteps ? 24 : 14}>
            <div style={{ marginBottom: "20px" }}>
              <Title level={1}>Chat Analyzer</Title>
              <Space>
                <Space>
                  <WhatsAppOutlined style={{ fontSize: "30px", color: "#25D366" }} />
                  <Text>WhatsApp</Text>
                </Space>
              </Space>
              <Title level={5}>
                Analiza tu chat de <strong>WhatsApp</strong> en segundos. Obtén
                información sobre tus chats con gráficos interactivos, estadísticas
                gratuitas.
              </Title>
            </div>
            {
              !showSteps && (
                <Alert
                  description="Los datos de tu chat no son guardados en nuestros servidores, solamente se suben para ser analizados y luego se eliminan."
                  type="info"
                  showIcon
                  style={{ marginBottom: "20px" }}
                />
              )
            }
            {
              showSteps ? (
                <HomeSteps />
              ) :
                (
                  <Button type="primary" size="large" onClick={() => setShowSteps(true)}>
                    <FireOutlined />
                    Comenzar
                  </Button>
                )
            }
          </Col>
          {
            !showSteps && (
              <Col span={10}>
                <Card>
                  <Chart {...demoChart1} type="bar" height={150} />
                </Card>
                <Card style={{ marginTop: "20px" }}>
                  <Chart {...demoChart2} type="pie" height={150} />
                </Card>
              </Col>
            )
          }
        </Row>
      </div>
    </div>
  );
};

export default Home;
