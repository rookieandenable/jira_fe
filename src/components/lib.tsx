import React from "react";
import styled from "styled-components";
import { Button } from 'antd'

interface RowProps {
  gap?: number | boolean
  between?: boolean
  marginBottom?: number
}

export const Row = styled.div<RowProps>`
  display: flex;
  align-items: center;
  justify-content: ${ (props) => props.between ? 'space-between' : undefined };
  margin-bottom: ${ (props) => props.marginBottom + 'rem' };

  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${ (props) => 
      typeof props.gap === 'number'
        ? props.gap + 'rem'
        : props.gap
        ? '2rem'
        : undefined 
    }
  }
`

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`

export const Container = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const HomeContainer = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr;
  height: 100vh;
`