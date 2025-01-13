import { Col, Row, Steps, Image } from "antd";
import { useState } from "react";

const AndroidTutorial: React.FC = () => {

  const items = [
    {
      title: 'Abre WhatsApp y el chat o chat de grupo que deseas exportar> en la parte superior toca el nombre del chat.',
      image: '/images/tutorials/ios/1.png',
    },
    {
      title: 'Desplázate hacia abajo y toca Exportar chat.',
      image: '/images/tutorials/ios/2.png',
    },
    {
      title: 'Elige si deseas incluir o no los archivos multimedia.',
      image: '/images/tutorials/ios/3.png',
    },
    {
      title: 'Selecciona en guardar en Archivos.',
      image: '/images/tutorials/ios/4.png',
    },
    {
      title: 'Listo, ya tienes tu chat exportado.',
      image: '/images/tutorials/ios/5.png',
    }
  ];

  const [current, setCurrent] = useState(0);

  const onChange = (value: number) => {
    console.log('onChange:', value);
    setCurrent(value);
  };

  return (
    <Row gutter={16}>
      <Col span={12}>
      <Steps
      current={current}
      items={items}
      onChange={onChange}
      direction="vertical"
    />
      </Col>
      <Col span={12}>
        <Image src={items[current].image} alt={items[current].title} height={500}/>
      </Col>
    </Row>
  );
}

export default AndroidTutorial;