import { Layout } from 'antd';
const { Footer } = Layout;

const FooterComponent = () => (
    <Footer
        style={{
            textAlign: 'center',
        }}
    >
        Navin3d ©{new Date().getFullYear()} GMC
    </Footer>
);

export default FooterComponent;
