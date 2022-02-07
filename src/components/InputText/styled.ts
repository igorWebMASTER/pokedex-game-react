import styled, { css } from "styled-components";

export const InputTextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  /* margin-bottom: 1.6rem; */
`;

export const Label = styled.label`
  margin-bottom: 0.4rem;
  font-weight: bold;
  font-size: 1.2rem;
  line-height: 1.6;
  text-transform: uppercase;
  color: #2e3a59;
  text-align:left;
`;

export const Input = styled.input < { hasShadow?: boolean } > `
  width: 100%;
  font-weight: 700;
  font-size: 1.6rem;
  padding: 1.2rem 0 1.2rem 0.8rem;
  background: #ffffff;
  border: 2px solid #e4e9f2;
  border-radius: 3px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  ${props => props.hasShadow && css`
    box-shadow: 0px 0px 1px 0px rgba(0,0,0,0.2);
  `}
  // has shadow
  



  &:focus,
  &:active {
    border-color: #598bff;
  }

  &::placeholder {
    color: #c5cef4;
    font-weight: 400;
  }


`;


export const Error = styled.div`
  text-align: left;
  font-size: 1.2rem;
  position: relative;
  color: #ff0000;`
