import React, { useState } from 'react';
import { Upload, Button, Typography, Space, Card, Row, Col, Progress, Alert, Tooltip, Select, Input, Slider } from 'antd';
import { 
  InboxOutlined, 
  UploadOutlined, 
  ReloadOutlined, 
  DownloadOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
  ZoomInOutlined,
  ZoomOutOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;
const { TextArea } = Input;

const sceneOptions = [
  { value: 'marble', label: 'Marble' },
  { value: 'wood', label: 'Wood' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'linen', label: 'Linen' },
  { value: 'brick', label: 'Brick' },
  { value: 'counter', label: 'Counter' },
];

function GenerateBackgroundSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [processedImage, setProcessedImage] = useState(null);
  const [scene, setScene] = useState(null);
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [scale, setScale] = useState(1);
  const [xCenter, setXCenter] = useState(0.5);
  const [yCenter, setYCenter] = useState(0.5);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      setIsComplete(false);
      setProcessedImage(null);
    };
    reader.readAsDataURL(file);
    return false;
  };

  const handleGenerateBackground = async () => {
    if (!selectedImage) return;

    setIsProcessing(true);
    try {
      // Convert base64 to blob
      const response = await fetch(selectedImage);
      const blob = await response.blob();

      // Create form data
      const formData = new FormData();
      formData.append('image', blob, 'image.png');
      formData.append('image_transform', JSON.stringify({
        scale,
        x_center: xCenter,
        y_center: yCenter
      }));

      if (scene) {
        formData.append('scene', scene);
      } else {
        formData.append('prompt', prompt);
        if (negativePrompt) {
          formData.append('negative_prompt', negativePrompt);
        }
      }

      // Make API request
      const apiResponse = await fetch('YOUR_API_ENDPOINT/generate-background', {
        method: 'POST',
        headers: {
          'Accept': 'image/*',
        },
        body: formData
      });

      if (!apiResponse.ok) {
        throw new Error('Failed to generate background');
      }

      // Get the processed image
      const processedBlob = await apiResponse.blob();
      const processedUrl = URL.createObjectURL(processedBlob);
      setProcessedImage(processedUrl);
      setIsComplete(true);
    } catch (error) {
      console.error('Error generating background:', error);
      // Handle error appropriately
    } finally {
      setIsProcessing(false);
    }
  };

  const uploadProps = {
    name: 'file',
    multiple: false,
    accept: 'image/*',
    beforeUpload: handleImageUpload,
    showUploadList: false,
  };

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <Title level={2} className="text-center mb-4">
          Generate Background
        </Title>
        <Paragraph className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload your image and let our AI generate a new background. 
          Choose from preset scenes or describe your desired background.
        </Paragraph>
        
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            {selectedImage ? (
              <div className="space-y-4">
                <div className="relative group">
                  <img 
                    src={processedImage || selectedImage} 
                    alt="Selected" 
                    className="w-full h-96 object-contain"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Space>
                      <Button 
                        type="primary" 
                        danger
                        icon={<ReloadOutlined />}
                        onClick={() => {
                          setSelectedImage(null);
                          setProcessedImage(null);
                          setIsComplete(false);
                        }}
                      >
                        Remove Image
                      </Button>
                      {processedImage && (
                        <Button
                          type="primary"
                          icon={<DownloadOutlined />}
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = processedImage;
                            link.download = 'generated-background.png';
                            link.click();
                          }}
                        >
                          Download
                        </Button>
                      )}
                    </Space>
                  </div>
                </div>
              </div>
            ) : (
              <Dragger {...uploadProps} className="bg-white p-8">
                <p className="ant-upload-drag-icon">
                  <InboxOutlined className="text-4xl text-blue-600" />
                </p>
                <p className="ant-upload-text text-lg">
                  Click or drag image to this area to upload
                </p>
                <p className="ant-upload-hint text-gray-500">
                  Support for a single image upload. Strictly prohibited from uploading company data or other
                  banned files.
                </p>
              </Dragger>
            )}
          </Col>

          <Col xs={24} lg={8}>
            <Card className="shadow-lg">
              <Title level={4} className="mb-4">Image Information</Title>
              {selectedImage ? (
                <div className="space-y-4">
                  <div>
                    <Text type="secondary">File Size</Text>
                    <Text className="block">2.4 MB</Text>
                  </div>
                  <div>
                    <Text type="secondary">Dimensions</Text>
                    <Text className="block">1920 x 1080 pixels</Text>
                  </div>
                  <div>
                    <Text type="secondary">Format</Text>
                    <Text className="block">PNG</Text>
                  </div>
                </div>
              ) : (
                <Paragraph className="text-gray-500">
                  Upload an image to see its details and available options.
                </Paragraph>
              )}
            </Card>

            <Card className="shadow-lg mt-6">
              <Title level={4} className="mb-4">Quick Tips</Title>
              <ul className="list-disc pl-4 space-y-2 text-gray-600">
                <li>Choose a scene type or write a detailed prompt</li>
                <li>Adjust image scale and position for best results</li>
                <li>Use negative prompts to avoid unwanted elements</li>
                <li>Download in high quality for best results</li>
              </ul>
            </Card>
          </Col>
        </Row>

        <div className="flex justify-center space-x-4 mt-8">
          <Button 
            type="primary"
            size="large"
            icon={<UploadOutlined />}
            className="bg-blue-600 hover:bg-blue-700"
            disabled={!selectedImage || isProcessing || (!scene && !prompt)}
            onClick={handleGenerateBackground}
          >
            {isProcessing ? 'Processing...' : 'Generate Background'}
          </Button>
          <Button 
            size="large"
            icon={<ReloadOutlined />}
            onClick={() => {
              setSelectedImage(null);
              setProcessedImage(null);
              setIsComplete(false);
              setScene(null);
              setPrompt('');
              setNegativePrompt('');
              setScale(1);
              setXCenter(0.5);
              setYCenter(0.5);
            }}
            disabled={!selectedImage || isProcessing}
          >
            Reset
          </Button>
        </div>
      </div>
    </section>
  );
}

export default GenerateBackgroundSection; 