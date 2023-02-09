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

const Kanban: React.FC = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/home\/(\d+)/)?.[1];
  const data = useAppSelector(homeState)?.projectsList?.filter(item => item.id === Number(id))
  const [ kanbans, setKanbans] = useState<KanbanListType[]>([])

  useEffect(() => {
    const list = async () => {
      const res = await api.getKanbanList({ projectId: id })
      setKanbans(res?.data)
    }
    list()
  }, [])

  return (
    <DragDropContext onDragEnd={() => {}}>
      <Container>
        <h1>{data?.[0]?.name}看板</h1>
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
                kanbans?.map((kanan, index) => (
                  <Drag
                    key={kanan.id}
                    draggableId={'kanban' + kanan.id}
                    index={index}
                  >
                    <KanbanColumn kanban={kanan} key={kanan.id} />
                  </Drag>
                ))
              }
            </DropChild>
          </Drop>
          <div>创建看板</div>
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
