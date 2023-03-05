import React from "react"
import styled from "styled-components"

export const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  .cancel {
    margin-right: 10px;
  }
`

interface PcontentProps {
  fontSize?: string;
  fontWeight?: string;
  color?: string;
  marginTop?: string;
  marginBottom?: string;
}
export const Pcontent = styled.p<PcontentProps>`
  font-size: ${props => props.fontSize || '32px'};
  font-weight: ${props => props.fontWeight || '500'};
  color: ${props => props.color || 'rgba(0, 0, 0, 0.85)'};
  margin-top: ${props => props.marginTop || '0'};
  margin-bottom: ${props => props.marginBottom || '.5rem'};
`