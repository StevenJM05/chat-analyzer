import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';

const { Dragger } = Upload;

interface UploaderProps {
  onSubmit: (file: File) => void; // Definimos el tipo de onSubmit
}

const Uploader: React.FC<UploaderProps> = ({ onSubmit }) => {
  const props = {
    name: 'file',
    multiple: false, // Asumimos que es solo un archivo para simplificar. Cambiar si necesitas varios archivos.
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    onChange(info: any) {
      const { status, file } = info;

      if (status === 'done') {
        message.success(`${file.name} file uploaded successfully.`);
        // Llamamos al callback onSubmit y pasamos el archivo
        onSubmit(file.originFileObj); // Aquí se pasa el archivo al padre
      } else if (status === 'error') {
        message.error(`${file.name} file upload failed.`);
      }
    },
    onDrop(e: any) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <Title level={4}>Arrastra tu chat en formato txt</Title>
      <Paragraph className="ant-upload-hint">
        Si tienes problemas para subir tu archivo, puedes ver este tutorial de como obtener tu chat
      </Paragraph>
    </Dragger>
  );
};

export default Uploader;
