import styled from 'styled-components';

export const Character = styled.div<{ tooltipStatus?: string }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > div img {
    cursor: ${props => (props.tooltipStatus === "available" ? 'pointer' : 'not-allowed')};
  }
`;
