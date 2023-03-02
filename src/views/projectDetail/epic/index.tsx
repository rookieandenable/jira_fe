import React, { useEffect, useState } from "react";
import { Container, Row } from "../../../components/lib";
import { Button, Form, Input, List, Modal, message } from "antd";
import { useAppSelector } from "../../../hooks/store";
import { homeState } from "../../../store/home";
import { useLocation } from "react-router";
import api from "../../../api";
import { EpicListType } from "../../../types/http";

const Epic: React.FC = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/home\/(\d+)/)?.[1];
  const data = useAppSelector(homeState)?.projectsList?.filter(item => item.id === Number(id))
  const [dataSource, setDataSource] = useState<EpicListType[]>([])
  const [ open, setOpen ] = useState(false)
  const [messageApi, contextHolder] = message.useMessage();

  const getEpicList = async () => {
    const res = await api.getEpicsList({ projectId: id })
    setDataSource(res?.data || [])
  }

  useEffect(() => {
    getEpicList()
  }, [])

  const submit = async (value) => {
    const params = {
      projectId: id,
      name: value.name
    }
    const res = await api.createEpic(params)
    if (res?.code === 200) {
      setOpen(false)
      getEpicList()
      messageApi.open({
        type: 'success',
        content: `添加 ${value.name} 成功`
      })
    }
  }

  const onDel = async (id) => {
    const res = await api.deleteEpic({ id })

    if (res?.code === 200) {
      getEpicList()
      messageApi.open({
        type: 'success',
        content: res?.msg || '删除成功'
      })
    }
  }

  return (
    <Container>
      { contextHolder }
      <Row between={true}>
        <h2>{data?.[0]?.name}任务组</h2>
        <Button type="link" size="large" onClick={() => setOpen(true)}>创建任务组</Button>
      </Row>
      <List
        dataSource={dataSource}
        bordered
        renderItem={item => (
          <List.Item key={item.id}>
            <List.Item.Meta
              title={ <span>{ item.name }</span> }
              description={
                <div>
                  <span>开始时间: {item.created}</span>
                  <br/>
                  <span>结束时间: {item.end}</span>
                </div>
              }
            />
            <Button type="link" onClick={() => onDel(item.id)}>删除</Button>
          </List.Item>
        )}
      />

      <Modal 
        title="编辑项目"
        maskClosable={false} 
        open={open} 
        onOk={() => setOpen(true)} 
        onCancel={() => setOpen(false)}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={submit}
        >
          <Form.Item 
            label='名称' 
            name='name'
            rules={[{ required: true, message: '请输入任务组名称' }]}
          >
            <Input placeholder="请输入任务组名称" />
          </Form.Item>
          <Form.Item name='id'>
            <Button htmlType="submit">提交</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Container>
  )
}

export default Epic