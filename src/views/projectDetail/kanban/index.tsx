import React, { useEffect, useState } from "react";
import { Container } from "@/components/lib";
import { useLocation } from "react-router";
import { useAppSelector } from "@/hooks/store";
import { homeState } from "@/store/home";
import styled from "styled-components";
import { Drag, Drop, DropChild } from "@/components/drag-and-drop";
import { KanbanColumn } from "./column";
import { DragDropContext } from 'react-beautiful-dnd'
import api from "@/api";
import { KanbanListType } from "@/types/http";
import { App, Button, Form, Input, Modal } from "antd";
import { ModalFooter, Pcontent } from "@/styled";

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
    if (item.type === 'COLUMN') {
      if (item.destination === null) {
        return
      }
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
      if (item.destination === null) {
        return
      }
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
      message.success(res.msg || '????????????')
      setOpen(false)
      list()
    }
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Container>
        <Pcontent>{data?.[0]?.name}??????</Pcontent>
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
          <Button type="link" onClick={() => setOpen(true)}>+????????????</Button>

          <Modal
            title="????????????"
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
              <Form.Item label="??????" name="name" rules={[{required: true, message: '???????????????'}]}>
                <Input placeholder="???????????????" />
              </Form.Item>
              <Form.Item>
                <ModalFooter>
                  <Button className="cancel" onClick={() => setOpen(false)}>??????</Button>
                  <Button type="primary" htmlType="submit">??????</Button>
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

export default Kanban
