import { Menu, MenuProps } from "antd";
import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router";
import styled from "styled-components";
import Header from "../../components/header";
import { HomeContainer } from "../../components/lib";
import Epic from "./epic";
import Kanban from "./kanban";

export default function ProjectDetail() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()

  type MenuItem = Required<MenuProps>['items'][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('看板', 'kanban'),
    getItem('任务组', 'epic'),
  ];

  const clickMenu = ({ key }) => {
    navigate(key)
  }

  return (
    <HomeContainer>
      <Header />
      <Container>
        <Aside>
          <Menu
            defaultSelectedKeys={['1']}
            mode="vertical"
            items={items}
            onClick={clickMenu}
          />
        </Aside>
        <Main>
          <Routes>
            <Route path="kanban" element={<Kanban />} />
            <Route path="epic" element={<Epic />} />
            <Route index element={<Kanban />} />
          </Routes>
        </Main>
      </Container>
    </HomeContainer>
  )
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  width: 100%;
`;

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  display: flex;
  overflow: hidden;
`;