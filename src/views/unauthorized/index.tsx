import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, message } from 'antd';
import { Background, Container, Header, ShadowCard, Title } from './styled'
import { SubmitProps } from '@/types'
import api from '@/api'
import { useNavigate } from 'react-router-dom'

interface MainPageProps {
  loginBtn: boolean;
  setLoginBtn: (value: boolean) => void
}

const MainPage: React.FC<MainPageProps> = (props) => {
  const { loginBtn, setLoginBtn } = props
  const navigate = useNavigate()
  const [ messageApi, contextHolder ] = message.useMessage()

  const onFinish = async (values: SubmitProps) => {
    const res  = loginBtn ? await api.login(values) : await api.registry(values)
    if (res?.code === 200) {
      const username = res?.data?.username
      sessionStorage.setItem('username', username)
      navigate('/home')
      return
    }
    messageApi.open({
      type: 'error',
      content: res?.msg
    })
  };

  return (
    <>
      { contextHolder }
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        {
          loginBtn ?
          '' :
          <Form.Item
            name="cpassword"
            rules={[{ required: true, message: 'Please confirm your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="cPassword"
            />
          </Form.Item>
        }

        <Form.Item>
          <Button type='link' onClick={() => setLoginBtn(!loginBtn)}>
            { loginBtn ? 'Go registry' : 'Go login' }
          </Button>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            { loginBtn ? 'Log in' : 'Register' }
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

const UnAuthorizedPage: React.FC = () => {
  const [loginBtn, setLoginBtn] = useState(false)

  return (
    <Container>
      <Header />
      <Background />
      <ShadowCard>
        <Title>
          { loginBtn ? 'Login' : 'Register1' }
        </Title>
        <MainPage 
          loginBtn={loginBtn}
          setLoginBtn={setLoginBtn}
        />
      </ShadowCard>
    </Container>
  )
}

export default UnAuthorizedPage;
