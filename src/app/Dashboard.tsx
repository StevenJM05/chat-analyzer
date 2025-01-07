import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import Chart from 'react-apexcharts';

const Dashboard = () => {
  const totalMessages = 150;
  const totalDays = 20;
  const totalHours = 100;

  const messagesPerDay = [8, 12, 15, 10, 20, 5, 9, 16, 12, 14, 11, 13, 15, 18, 19, 10, 8, 12, 14, 20];
  const messagesPerMonth = [120, 130, 140, 110, 115, 125, 130, 135, 145, 160, 170, 150];
  const messagesPerHour = [10, 15, 13, 12, 17, 10, 12, 14, 9, 11, 13, 16];

  // Opciones de las gráficas
  const options = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: Array.from({ length: messagesPerDay.length }, (_, i) => `Día ${i + 1}`),
    },
    title: {
      text: 'Mensajes por Día',
    },
  };

  const optionsMonth = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    },
    title: {
      text: 'Mensajes por Mes',
    },
  };

  const optionsHour = {
    chart: {
      type: 'line',
    },
    xaxis: {
      categories: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00', '06:00', '07:00', '08:00', '09:00', '10:00', '11:00'],
    },
    title: {
      text: 'Mensajes por Hora',
    },
  };

  return (
    <div style={{ padding: '20px' }}>
      <Row gutter={16}>
        <Col span={8}>
          <Card>
            <Statistic title="Total de Mensajes" value={totalMessages} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total de Días Hablados" value={totalDays} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Statistic title="Total de Horas Habladas" value={totalHours} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={8}>
          <Card>
            <Chart options={options} series={[{ name: 'Mensajes', data: messagesPerDay }]} type="line" height={350} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Chart options={optionsMonth} series={[{ name: 'Mensajes', data: messagesPerMonth }]} type="line" height={350} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Chart options={optionsHour} series={[{ name: 'Mensajes', data: messagesPerHour }]} type="line" height={350} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
