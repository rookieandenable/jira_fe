import React from "react";
import styled from "styled-components";
import { ButtonNoPadding, Row } from "../lib";
// import { ReactComponent as SoftWareLogo } from '@/assets/software-logo.svg'
import SoftWareLogo from '@/components/softWareLogo'
import { Button, Divider, Dropdown, List, Popover, Typography } from "antd";
import { useAppSelector } from "@/hooks/store";
import { homeState } from "@/store/home";
import { MembersType, ProjectListType } from "@/types/http";
import { useNavigate } from "react-router";

const ProjectPopover = () => {
  const state = useAppSelector(homeState)
  const collectionProjects = state.projectsList.filter(item => item.enshrine)

  const content = (
    <ProjectPopoverContainer>
      <List
        dataSource={collectionProjects}
        renderItem={(item: ProjectListType) => (
          <List.Item>{item.name}</List.Item>
        )}
      />
      <Divider />
    </ProjectPopoverContainer>
  )

  return (
    <Popover placement="bottom" content={content} title="收藏项目" trigger="hover">
      <Typography.Text>项目</Typography.Text>
    </Popover>
  )
}

const UserPopover = () => {
  const state = useAppSelector(homeState)
  const content = (
    <UserPopoverContainer>
      <List
        dataSource={state.membersList}
        renderItem = {(item: MembersType) => (
          <List.Item>{item.name}</List.Item>
          )}
          />
      <Divider />
    </UserPopoverContainer>
  )
  
  return (
    <Popover placement="bottom" content={content} title="组员列表" trigger="hover">
      <Typography.Text>组员</Typography.Text>
    </Popover>
  )
}

const ShowUserInfo = () => {
  const navigate = useNavigate()
  const items = [
    {
      key: '1',
      label: (
        <Button type="link" onClick={() => navigate('/')}>登出</Button>
      )
    }
  ]

  return (
    <Dropdown menu={{ items }} placement="bottom">
      <Button type='link'>hi, jack</Button>
    </Dropdown>
  )
}

export default function Header() {
  const navigate = useNavigate()

  return (
    <HeaderContainer between={true}>
      <HeaderL gap={true}>
        <ButtonNoPadding type="link">
          <SoftWareLogo width='18rem' color={"rgb(38, 132, 255)"} onClick={() => navigate('/home')} />
        </ButtonNoPadding>
        <ProjectPopover />
        <UserPopover />
      </HeaderL>
      <HeaderR>
        <ShowUserInfo />
      </HeaderR>
    </HeaderContainer>
  )
}

const HeaderContainer = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderL = styled(Row)``
const HeaderR = styled.div``

const ProjectPopoverContainer = styled.div`
  min-width: 30rem;
`

const UserPopoverContainer = styled.div`
  min-width: 30rem;
`