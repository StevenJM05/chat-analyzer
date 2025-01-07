import React from 'react';
import { Card, Row, Col, Statistic } from 'antd';
import Chart from 'react-apexcharts';

interface DashboardProps {
  stats: {
    count: number;
    days: number;
    messagesPerMonth: Record<string, number>;
    messagesByYear: Record<string, number>;
    HoursWithMostMessages: Record<string, number>;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const totalMessages = stats.count;
  const totalDays = stats.days;
  const messagesPerMonth = stats.messagesPerMonth;
  const messagesPerDay = stats.messagesByYear;
  const messagesPerHour = stats.HoursWithMostMessages;

  // messages per month
  const options = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: Object.keys(messagesPerMonth),
    },
  };

  // messages per day
  const optionsMonth = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: Object.keys(messagesPerDay),
    },
  };

  // messages per hour
  const optionsHour = {
    chart: {
      id: 'basic-bar',
    },
    xaxis: {
      categories: Object.keys(messagesPerHour),
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
            <Statistic title="Total de Horas Habladas (Beta)" value={10} />
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={8}>
          <Card>
            <Chart options={options} series={[{ name: 'Mensajes', data: Object.values(messagesPerDay) }]} type="line" height={350} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Chart options={optionsMonth} series={[{ name: 'Mensajes', data: Object.values(messagesPerMonth) }]} type="line" height={350} />
          </Card>
        </Col>
        <Col span={8}>
          <Card>
            <Chart options={optionsHour} series={[{ name: 'Mensajes', data: Object.values(messagesPerHour) }]} type="line" height={350} />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
