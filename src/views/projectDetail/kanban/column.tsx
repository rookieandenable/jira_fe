import React, { useState } from "react"
import { KanbanListType } from "@/types/http"
import styled from "styled-components"
import { Row } from "@/components/lib"
import { Drag, Drop, DropChild } from "@/components/drag-and-drop"
import { App, Button, Dropdown, Form, Input, Modal, Select, Card, Popconfirm } from "antd"
import api from "@/api"
import { ModalFooter, Pcontent } from "@/styled"
import { kanbanType } from '@/config'
import bugIcon from '@/assets/bug.svg'
import taskIcon from '@/assets/task.svg'


const DropContent: React.FC<{ id: number; list: () => Promise<void> }> = ({ id, list }) => {
  const { message } = App.useApp()

  const deleteGroup = async (id) => {
    const obj = {
      id
    }
    const res = await api.deleteKanbanGroup(obj)
    if (res.code === 200) {
      message.success(res.msg || '操作成功')
      list()
    }
  }
  const items = [
    {
      key: 1,
      label: (
        <Popconfirm
          title="提示"
          description="确定要删除吗?"
          placement="topRight"
          okText="是"
          cancelText="否"
          onConfirm={() => deleteGroup(id)}
        >
          <Button type="link" size="small">删除</Button>
        </Popconfirm>
      )
    },
    // {
    //   key: 2,
    //   label: <Button type="link" size="small">编辑</Button>
    // },
  ]

  return (
    <Dropdown placement="bottom" menu={{ items }}>
      <span>...</span>
    </Dropdown>
  )
}

export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: KanbanListType; list: () => Promise<void> }
>(({ kanban, list, ...props }, ref) => {
  const [open, setOpen] = useState(false)
  const [edit, setEdit] = useState(false)
  const { message } = App.useApp()
  const [form] = Form.useForm()

  const handleSubmite = async (value) => {
    const params = {
      name: value.name,
      typeId: value.typeId,
      id: kanban.id
    }
    const res = await api.createKanbanItem(params)
    if (res.code === 200) {
      setOpen(false)
      message.success(res.msg || '操作成功')
      list()
    }
  }

  const openEdit = (value) => {
    form.setFieldValue('name', value.name)
    form.setFieldValue('typeId', value.typeId)
    form.setFieldValue('kanbanGroupId', kanban.id)
    form.setFieldValue('kanbanId', value.id)
    setEdit(true)
  }

  const handleDelete = async () => {
    const obj = {
      kanbanId: form.getFieldValue('kanbanId'),
      kanbanGroupId: form.getFieldValue('kanbanGroupId'),
    }
    const res = await api.deleteKanbanItem(obj)
    if (res.code === 200) {
      message.success(res.msg || '操作成功')
      list()
      setEdit(false)
    }
  }

  const handleEdit = async (value) => {
    const obj = {
      name: value.name,
      typeId: value.typeId,
      kanbanGroupId: value.kanbanGroupId,
      kanbanId: value.kanbanId,
    }
    const res = await api.updateKanbanItem(obj)
    if (res.code === 200) {
      message.success(res.msg || '操作成功')
      list()
      setEdit(false)
    }
  }

  return (
    // style={{height: "calc(100vh - 190px)"}}
    <Container { ...props } ref={ref}>
      <Row between={true}>
        <Pcontent fontSize="16px" marginBottom="0" fontWeight="400">{kanban.name}</Pcontent>
        <DropContent id={kanban.id} list={list} />
      </Row>
      <TasksContainer>
        <Drop
          type="ROW"
          direction="vertical"
          droppableId={kanban.id + ''}
        >
          <DropChild style={{ minHeight: '1rem' }}>
            {
              kanban.children.map((item) => (
                <Drag
                  key={item.id}
                  index={item.sort}
                  draggableId={ item.id + 'task' }
                >
                  <div onClick={() => openEdit(item)}>
                    <Card
                      style={{marginBottom: '.5rem', cursor: 'pointer'}}
                    >
                      <p>{item.name}</p>
                      <img alt={ item.typeId === 1 ? 'task' : 'bug' } src={ item.typeId === 1 ? taskIcon : bugIcon } />
                    </Card>
                  </div>
                </Drag>
              ))
            }
          </DropChild>
        </Drop>
        <Button type="link" onClick={() => setOpen(true)}>+创建事务</Button>
      </TasksContainer>

      <Modal
        title="创建事务"
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        maskClosable={false}
        centered={true}
        destroyOnClose={true}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleSubmite}
        >
          <Form.Item label="名称" name="name" rules={[{required: true, message: '请输入名称'}]}>
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="类型" name="typeId" initialValue={1} rules={[{required: true, message: '请选择类型'}]}>
            <Select
              style={{ width: 120 }}
              options={kanbanType}
            />
          </Form.Item>
          <Form.Item>
            <ModalFooter>
              <Button className="cancel" onClick={() => setOpen(false)}>取消</Button>
              <Button type="primary" htmlType="submit">提交</Button>
            </ModalFooter>
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="编辑事务"
        open={edit}
        onOk={() => setEdit(false)}
        onCancel={() => setEdit(false)}
        maskClosable={false}
        centered={true}
        destroyOnClose={true}
        footer={null}
      >
        <Form
          layout="vertical"
          onFinish={handleEdit}
          form={form}
        >
          <Form.Item label="名称" name="name" rules={[{required: true, message: '请输入名称'}]}>
            <Input placeholder="请输入名称" />
          </Form.Item>
          <Form.Item label="类型" name="typeId" rules={[{required: true, message: '请选择类型'}]}>
            <Select
              style={{ width: 120 }}
              options={kanbanType}
            />
          </Form.Item>
          <Form.Item name="kanbanGroupId">
            <Popconfirm
              title="提示"
              description="确定要删除吗?"
              placement="topRight"
              okText="是"
              cancelText="否"
              onConfirm={handleDelete}
            >
              <ModalFooter>
                <Button danger>删除</Button>
              </ModalFooter>
            </Popconfirm>
          </Form.Item>
          <Form.Item name="kanbanId">
            <ModalFooter>
              <Button className="cancel" onClick={() => setEdit(false)}>取消</Button>
              <Button type="primary" htmlType="submit">提交</Button>
            </ModalFooter>
          </Form.Item>
        </Form>
      </Modal>

    </Container>
  )
})

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: .7rem .7rem 1rem;
  margin-right: 1.5rem;
`

const TasksContainer = styled.div`
  flex: 1;
  overflow: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`