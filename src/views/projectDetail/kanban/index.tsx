import React, { useEffect, useState } from "react";
import { Container } from "../../../components/lib";
import { useLocation } from "react-router";
import { useAppSelector } from "../../../hooks/store";
import { homeState } from "../../../store/home";
import styled from "styled-components";
import { Drag, Drop, DropChild } from "../../../components/drag-and-drop";
import { KanbanColumn } from "./column";
import { DragDropContext } from 'react-beautiful-dnd'
import api from "../../../api";
import { KanbanListType } from "../../../types/http";
import { App, Button, Form, Input, Modal } from "antd";

const Kanban: React.FC = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/home\/(\d+)/)?.[1];
  const data = useAppSelector(homeState)?.projectsList?.filter(item => item.id === Number(id))
  const [ kanbans, setKanbans] = useState<KanbanListType[]>([])
  const [ open, setOpen ] = useState(false)
  const { message } = App.useApp()
  
  const list = async () => {
    const res = await api.getKanbanList({ projectId: id })
    setKanbans(res?.data)
  }
  useEffect(() => {
    list()
  }, [])

  const handleDragEnd = async (item) => {
    console.log('item ---', item)
    if (item.type === 'COLUMN') {
      const { index: sourceIndex } = item.source
      const { index: destinationIndex } = item.destination
      const draggableId = parseInt(item.draggableId)
      if(sourceIndex === destinationIndex) return

      const params = {
        sourceIndex,
        destinationIndex,
        draggableId,
      }
      const res = await api.toMoveColumn(params)
      if (res.code === 200) {
        list()
      }
    }

    if (item.type === 'ROW') {
      const { index: sourceIndex, droppableId: dropColumnSourceId } = item.source
      const { index: destinationIndex, droppableId: dropColumnDestinationId } = item.destination
      const drapRowsourceId = parseInt(item.draggableId)
      if(sourceIndex === destinationIndex) return

      const params = {
        sourceIndex,
        destinationIndex,
        drapRowsourceId,
        dropColumnSourceId,
        dropColumnDestinationId,
      }
      const res = await api.toMoveRow(params)
      if (res.code === 200) {
        list()
      }
    }
  }

  const createKanban = async (value) => {
    const obj = {
      name: value.name,
      projectId: id
    }

    const res = await api.createKanbanGroup(obj)
    if (res.code === 200) {
      message.success(res.msg || '操作成功')
      setOpen(false)
      list()
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container>
        <h2>{data?.[0]?.name}看板</h2>
        <ColumnsContainer>
          <Drop
            type="COLUMN"
            direction="horizontal"
            droppableId="kanban"
          >
            <DropChild
              style={{ display: 'flex' }}
            >
              {
                kanbans?.map((kanban) => (
                  <Drag
                    key={kanban.id}
                    draggableId={kanban.id + 'kanban'}
                    index={kanban.sort}
                  >
                    <KanbanColumn kanban={kanban} list={list} key={kanban.id} />
                  </Drag>
                ))
              }
            </DropChild>
          </Drop>
          <Button type="link" onClick={() => setOpen(true)}>创建看板</Button>

          <Modal
            title="创建看板"
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
              onFinish={createKanban}
            >
              <Form.Item label="名称" name="name" rules={[{required: true, message: '请输入名称'}]}>
                <Input placeholder="请输入名称" />
              </Form.Item>
              <Form.Item>
                <ModalFooter>
                  <Button className="cancel" onClick={() => setOpen(false)}>取消</Button>
                  <Button type="primary" htmlType="submit">提交</Button>
                </ModalFooter>
              </Form.Item>
            </Form>
          </Modal>

        </ColumnsContainer>
      </Container>
    </DragDropContext>
  )
}

const ColumnsContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  .cancel {
    margin-right: 10px;
  }
`

export default Kanban
