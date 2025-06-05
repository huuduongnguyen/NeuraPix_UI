import React, { useState } from 'react';
import { Upload, Button, Typography, Space, Card, Slider, Row, Col, Progress, Alert, Tooltip } from 'antd';
import { 
  InboxOutlined, 
  UploadOutlined, 
  ReloadOutlined, 
  ZoomInOutlined, 
  ZoomOutOutlined,
  DownloadOutlined,
  InfoCircleOutlined,
  CheckCircleOutlined,
  LoadingOutlined
} from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;
const { Dragger } = Upload;

function SharpenSection() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [sharpness, setSharpness] = useState(50);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [zoom, setZoom] = useState(100);

  const handleImageUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setSelectedImage(e.target.result);
      setIsComplete(false);
    };
    reader.readAsDataURL(file);
    return false; // Prevent default upload behavior
  };

  const handleSharpen = () => {
    setIsProcessing(true);
    // Simulate processing time
    setTimeout(() => {
      setIsProcessing(false);
      setIsComplete(true);
    }, 2000);
  };

  const handleZoom = (value) => {
    setZoom(value);
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
          Sharpen Your Images
        </Title>
        <Paragraph className="text-center text-gray-600 mb-8 max-w-2xl mx-auto">
          Upload your image and let our AI enhance its quality with advanced sharpening technology. 
          Adjust the sharpness level to get the perfect result for your needs.
        </Paragraph>
        
        <Row gutter={[24, 24]}>
          <Col xs={24} lg={16}>
            {selectedImage ? (
              <div className="space-y-4">
                <div className="relative group">
                  <img 
                    src={selectedImage} 
                    alt="Selected" 
                    className="w-full h-96 object-contain"
                    style={{ transform: `scale(${zoom / 100})` }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Space>
                      <Button 
                        type="primary" 
                        danger
                        icon={<ReloadOutlined />}
                        onClick={() => {
                          setSelectedImage(null);
                          setIsComplete(false);
                        }}
                      >
                        Remove Image
                      </Button>
                      <Button
                        type="primary"
                        icon={<DownloadOutlined />}
                        disabled={!isComplete}
                      >
                        Download
                      </Button>
                    </Space>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Text>Zoom Level</Text>
                    <Space>
                      <Button 
                        icon={<ZoomOutOutlined />} 
                        onClick={() => setZoom(Math.max(50, zoom - 10))}
                      />
                      <Text>{zoom}%</Text>
                      <Button 
                        icon={<ZoomInOutlined />} 
                        onClick={() => setZoom(Math.min(200, zoom + 10))}
                      />
                    </Space>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Text>Sharpness Level</Text>
                      <Tooltip title="Adjust the sharpness level to enhance image details">
                        <InfoCircleOutlined className="text-gray-400" />
                      </Tooltip>
                    </div>
                    <Slider 
                      value={sharpness}
                      onChange={setSharpness}
                      marks={{
                        0: 'Soft',
                        50: 'Balanced',
                        100: 'Sharp'
                      }}
                    />
                  </div>

                  {isProcessing && (
                    <div className="text-center">
                      <LoadingOutlined className="text-2xl text-blue-600 mr-2" />
                      <Text>Processing your image...</Text>
                      <Progress percent={75} status="active" className="mt-2" />
                    </div>
                  )}

                  {isComplete && (
                    <Alert
                      message="Image processing complete!"
                      description="Your image has been successfully sharpened. You can now download the result."
                      type="success"
                      showIcon
                      icon={<CheckCircleOutlined />}
                    />
                  )}
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
                    <Text className="block">JPEG</Text>
                  </div>
                  <div>
                    <Text type="secondary">Current Sharpness</Text>
                    <Text className="block">{sharpness}%</Text>
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
                <li>For best results, use high-resolution images</li>
                <li>Adjust sharpness based on image content</li>
                <li>Download in original quality</li>
                <li>Process multiple images in sequence</li>
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
            disabled={!selectedImage || isProcessing}
            onClick={handleSharpen}
          >
            {isProcessing ? 'Processing...' : 'Sharpen Image'}
          </Button>
          <Button 
            size="large"
            icon={<ReloadOutlined />}
            onClick={() => {
              setSelectedImage(null);
              setIsComplete(false);
              setSharpness(50);
              setZoom(100);
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

export default SharpenSection; 