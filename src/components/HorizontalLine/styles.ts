import styled from "styled-components";

export const HorizontalLineContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 1rem 0;

  span{
    font-size: 1.5rem;
    font-weight: 600;
    text-transform: uppercase;
    color: #004a45;
    margin: 0 1rem;
  }

  div{
    width: 100%;
    padding: 0 1rem;
    height: 1px;
    background: #ccc;
  }
`
