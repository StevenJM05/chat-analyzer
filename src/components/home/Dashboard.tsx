import React from 'react';
import { Card, Row, Col, Statistic, Modal } from 'antd';
import Chart from 'react-apexcharts';
import { ApexOptions } from "apexcharts";

interface DashboardProps {
  stats: {
    count: number;
    days: number;
    messagesByMonth: Record<string, number>;
    messagesByYear: Record<string, number>;
    messagesByHour: Record<string, number>;
    messagesBySender: Record<string, number>;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const totalMessages = stats.count;
  const totalDays = stats.days;
  const messagesPerMonth = stats.messagesByMonth;
  const messagesPerYear = stats.messagesByYear;
  const messagesPerHour = stats.messagesByHour;
  const messagesPerSender = stats.messagesBySender;

  // messages per month
  const optionsMonth = {
    xaxis: {
      categories: Object.keys(messagesPerMonth),
    },
  };

  // messages per year
  const optionsYear = {
    xaxis: {
      categories: Object.keys(messagesPerYear),
    },
  };

  // messages per hour
  const optionsHour = {
    xaxis: {
      categories: Object.keys(messagesPerHour),
    },
  };

  //messages per sender
  const senders = Object.keys(messagesPerSender);
  const series = Object.values(messagesPerSender);
  const options: ApexOptions = {
    chart: {
      type: "donut",
    },
    labels: senders,
    legend: {
      position: "bottom",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div style={{ marginTop: '20px' }}>
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

      <Card style={{ marginTop: '20px' }}>
        <Chart options={optionsHour} series={[{ name: 'Mensajes', data: Object.values(messagesPerHour) }]} type="bar" height={350} />
      </Card>

      <Row gutter={16} style={{ marginTop: '20px' }}>
        <Col span={12}>
          <Card>
            <Chart options={optionsYear} series={[{ name: 'Mensajes', data: Object.values(messagesPerYear) }]} type="bar" height={350} />

          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Chart options={optionsMonth} series={[{ name: 'Mensajes', data: Object.values(messagesPerMonth) }]} type="bar" height={350} />

          </Card>
        </Col>
      </Row>

      <Card style={{ marginTop: '20px'}}>
          <Chart options={options} series={series} type="donut" width="500" />
      </Card>

    </div>
  );
};

export default Dashboard;
