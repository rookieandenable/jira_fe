import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../../components/header";
import { ButtonNoPadding, Container, HomeContainer, Row } from "../../components/lib";
import Search from './search'
import List from './list'
import { useAppDispatch } from "../../hooks/store";
import { getMembers, getProjects } from "../../store/home";
import { Button, Form, Input, message, Modal } from "antd";
import BaseSelect from "../../components/baseSelect";
import api from "../../api";

export default function Home() {
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    dispatch(getMembers())
  }, [])

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const submit = async (value) => {
    if (!value.personId) {
      value.personId = 5
    }
    const res = await api.createProject(value)
    setIsModalOpen(false)
    if (res.code === 200) {
      dispatch(getProjects())
      messageApi.open({
        type: 'success',
        content: res.msg
      })
      return
    }
    messageApi.open({
      type: 'error',
      content: res.msg
    })
  }
  const setVal = (value) => {
    form.setFieldValue('personId', value)
  }

  return (
    <HomeContainer>
      <Header />
      <Main>
        <Container>
          <Row marginBottom={2} between={true}>
            <h2>项目列表</h2>
            <ButtonNoPadding type="link" onClick={showModal}>
              创建项目
            </ButtonNoPadding>
          </Row>
          <Search />
          <List />
        </Container>
      </Main>

      <Modal title="创建项目"
        maskClosable={false} 
        open={isModalOpen} 
        onOk={handleOk} 
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={submit}
          form={form}
        >
          <Form.Item 
            label='名称' 
            name='name'
            rules={[{ required: true, message: 'please input name' }]}
          >
            <Input placeholder="please input name" />
          </Form.Item>
          <Form.Item 
            label='部门'
            name='organization'
            rules={[{ required: true, message: 'please input depend' }]}
          >
            <Input placeholder="please input depend" />
          </Form.Item>
          <Form.Item label='负责人' name='personId' >
            <BaseSelect setVal={setVal} />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Modal>
      { contextHolder }
    </HomeContainer>
  )
}

const Main = styled.main`
  display: flex;
  overflow: hidden;
`
