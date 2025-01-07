'use client';
import React from "react";
import Uploader from "./Uploader";
import Title from "antd/es/typography/Title";
import Text from "antd/es/typography/Text";
import { Alert, Button, Modal, Space } from "antd";
import { WhatsAppOutlined } from "@ant-design/icons";
import Dashboard from "./Dashboard";
import HomeSteps from "./Steps";

const Home = () => {

  const [showSteps, setShowSteps] = React.useState(false);
  const [showStats, setShowStats] = React.useState(false);
  const [stats, setStats] = React.useState(null);

  const submit = (file: any) => {
    setShowStats(true);

    const formData = new FormData();
    formData.append("file", file);

    fetch("api/analyzer", {
      method: "POST",
      body: formData,
    }).then((response) => response.json())
      .then((data) => setStats(data));
  }

  const handleClose = () => {
    setShowStats(false);
    setStats(null);
  }

  return (
    <div>
      <div style={{ maxWidth: 1024, margin: "50px auto", padding: "20px" }}>
        <div style={{ textAlign: "center", marginBottom: "20px" }}>
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
        <Alert
          description="Los datos de tu chat no son guardados en nuestros servidores, solamente se suben para ser analizados y luego se eliminan."
          type="info"
          showIcon
          style={{ marginBottom: "20px" }}
        />
        {
          showSteps ? (
            <HomeSteps />
          ) :
            (
              <Button type="primary" onClick={() => setShowSteps(true)}>
                Comenzar
              </Button>
            )
        }
      </div>

      {
        showStats && stats != null && (
          <Modal
            title="Resultados"
            footer={null}
            open={showStats}
            onCancel={handleClose}
            width={800}
          >
            <Dashboard open={showStats} stats={stats} />
          </Modal>
        )
      }
    </div>
  );
};

export default Home;
