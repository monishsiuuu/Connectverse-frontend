import { Space, Image, QRCode } from 'antd';
import {
    DownloadOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons';

const ShowQRCode = ({ link }) => {
    const onDownload = () => {
        fetch(link)
            .then((response) => response.blob())
            .then((blob) => {
                const url = URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.download = 'qrcode.png';
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(url);
                link.remove();
            });
    };

    return (
        <Space direction="vertical" align="center">
            <Image
                width={200}
                src={link}
                preview={{
                    toolbarRender: (
                        _,
                        {
                            transform: { scale },
                            actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                        },
                    ) => (
                        <Space size={12} className="toolbar-wrapper">
                            <DownloadOutlined onClick={onDownload} />
                            <SwapOutlined rotate={90} onClick={onFlipY} />
                            <SwapOutlined onClick={onFlipX} />
                            <RotateLeftOutlined onClick={onRotateLeft} />
                            <RotateRightOutlined onClick={onRotateRight} />
                            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                        </Space>
                    ),
                }}
            />
            {link == "-" && <QRCode value='https://github.com/Navin3d' icon="https://lh3.googleusercontent.com/a/ACg8ocKIWx-83zJT8Pv6kWwJK-EcR9KpNzllTzXU7YezSl7PYkv4=s96-c" />}
            <h3>Download Google Authenticator and Scan this code.</h3>
            <p>Multi-factor authentication is an electronic authentication method in which a user is granted access to a website or application only after successfully presenting two or more pieces of evidence to an authentication mechanism.</p>
        </Space>
    );
};

export default ShowQRCode;
