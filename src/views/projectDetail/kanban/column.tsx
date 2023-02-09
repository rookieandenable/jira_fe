import React from "react"
import { KanbanListType } from "../../../types/http"
import styled from "styled-components"
import { Row } from "../../../components/lib"
import { Drag, Drop, DropChild } from "../../../components/drag-and-drop"

export const KanbanColumn = React.forwardRef<
  HTMLDivElement,
  { kanban: KanbanListType }
>(({ kanban, ...props }, ref) => {

  return (
    <Container { ...props } ref={ref}>
      <Row between={true}>
        <h3>待开发</h3>
        <span>...</span>
      </Row>
      <TasksContainer>
        <Drop
          type="ROW"
          direction="vertical"
          droppableId={String(kanban.id)}
        >
          <DropChild style={{ minHeight: '1rem' }}>
            {
              kanban.children.map((item, index) => (
                <Drag
                  key={item.id}
                  index={index}
                  draggableId={ 'task' + item.id }
                >
                  <div><h3>{item.name}</h3></div>
                </Drag>
              ))
            }
          </DropChild>
        </Drop>
        <div>创建事务</div>
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