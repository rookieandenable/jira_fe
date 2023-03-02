import React from "react"
import { KanbanListType } from "../../../types/http"
import styled from "styled-components"
import { Row } from "../../../components/lib"
import { Drag, Drop, DropChild } from "../../../components/drag-and-drop"
import { App, Button, Dropdown } from "antd"
import api from "../../../api"


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
      label: <Button type="link" size="small" onClick={() => deleteGroup(id)}>删除</Button>
    },
    {
      key: 2,
      label: <Button type="link" size="small">编辑</Button>
    },
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

  return (
    <Container { ...props } ref={ref}>
      <Row between={true}>
        <h4>{kanban.name}</h4>
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
                  <div><h5>{item.name}</h5></div>
                </Drag>
              ))
            }
          </DropChild>
        </Drop>
        <Button type="link">创建事务</Button>
      </TasksContainer>
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
  overflow: scroll;
  flex: 1;

  ::-webkit-scrollbar {
    display: none;
  }
`