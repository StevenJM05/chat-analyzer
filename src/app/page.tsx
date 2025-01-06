'use client';
import React from "react";
import UploadSection from "./Uploader";
import Title from "antd/es/typography/Title";
import { Alert } from "antd";

const Home = () => {
  return (
    <div style={{ maxWidth: 800, margin: "50px auto", padding: "20px" }}>
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <Title>Chat Analyzer</Title>
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
      <UploadSection />
    </div>
  );
};

export default Home;
