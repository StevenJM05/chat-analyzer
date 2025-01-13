import React from 'react';
import { InboxOutlined } from '@ant-design/icons';
import { Upload, message } from 'antd';
import Title from 'antd/es/typography/Title';
import Paragraph from 'antd/es/typography/Paragraph';

const { Dragger } = Upload;

interface UploaderProps {
  onSubmit: (file: File) => void;
}

const Uploader: React.FC<UploaderProps> = ({ onSubmit }) => {
  const props = {
    name: 'file',
    multiple: false,
    customRequest: async ({ file, onSuccess, onError }: any) => {
      try {
        onSubmit(file); 
        onSuccess();
      } catch (error) {
        onError(error); 
        message.error("Error al procesar el archivo.");
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
