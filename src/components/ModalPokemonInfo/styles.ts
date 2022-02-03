import styled from "styled-components";

export const ModalOverlay = styled.div`
  background: var(--modal-background);
  display: flex;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: fixed;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  z-index:90;
`

export const Text = styled.h1`
  margin-bottom: 1rem;
  text-decoration: underline;
  color: var(--link-color);

`

export const ModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  max-height:500px;
  position: relative;

  white-space: nowrap;
  overflow: auto;
  text-overflow: ellipsis;

  min-width: 350px;
  border-radius: 10px;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
  text-align: center;

  @media screen and (max-width: 350px){
    min-width: 26rem;
  }
`

export const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius:10px;
  background-image: linear-gradient(to right, #45e97b, #38f9d5);
  justify-content: space-between;
  align-items: center;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;


  button {
    margin-left: auto;
    margin-right: 20px;
    margin-top: 10px;
    background: #fff;
    width: 40px;
    border-radius: 50%;
    padding: 1rem;
    cursor: pointer;
    border: 2px solid #999;
  }

  div{
    z-index: 999;
    width: calc(100% - 35%);
    height: 200px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius:50%;
    background: #fff;
    border: 4px solid var(--primary-default);
    position: relative;
    top: -20px;

    @media screen and (max-width: 320px){
      width: calc(100% - 20%);
    }


    img{
      width: 100%;
      max-width: 120px;
    }

  }
`

export const ModalBody = styled.div`
  display: flex;
  height: 800px;
  padding: 0 2rem;
  width: 100%;
  position: absolute;
  top: 25%;
  border-radius: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: #fff;


`

export const ModalTextBody = styled.div`
  text-transform: uppercase;
  font-weight: bold;
  font-size: 2rem;
  margin: 1em 0;
  padding: 0 2rem;
  color: #004a45;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  align-items: center;

  margin-left: 40px;

  img{
    margin-left: 10px;
    max-width: 20px;
    height: 60%;
    cursor: pointer;
  }

`
export const ModalAbilitiesInfo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  div:first-child {
    border-left:none;
  }

  div{
    flex: 1;
    display: flex;
    flex-direction: column;
    border-left: 1px solid #ccc;
    color: #004a45;

    span{
      margin: 0.2rem 0;
      font-size: 1.1rem;
      font-weight: bold;
    }

    span.main-status{
      font-size: 1.9rem;
      font-weight: bold;
    }
  }
`

export const TypeInfoContainer = styled.div`
  display: flex;
  margin: 1.7rem 0;
  justify-content: center;
  width: 100%;
`

export const Badge = styled.div<{ color?: string }>`
    width: 38.3%;
    display: flex;
    margin: 0 0.7rem;
    text-transform: uppercase;
    border-radius: 16px;
    align-items: center;
    justify-content: center;
    padding: 0.6rem 0.7rem;
    background-color: green;
    color:#fff;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: ${props => props.color};
  `;

export const AbilitiesInfoContainer = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;

    div{
      display: flex;
      align-items: center;
      span{
        font-weight: bold;
      }


      img{
        margin-right: 1rem;
        align-self: center;
      }
    }

    h3{
      text-transform: uppercase;
      font-weight: bold;
    }

    span{
      font-size: 1.2rem;
      text-transform: uppercase;
      font-weight: bold;
      margin: 1rem 0.5rem;
    }

  `

export const CaptureButtonContainer = styled.div`
    position: fixed;
     margin: 0% auto;
     left: 0;
      right: 0;

  button{


      max-width:300px;
      filter: drop-shadow(0 0px 2.15rem rgba(0, 0, 0, 0.347));

  }
`

export const ButtonCatchPokemon = styled.button`
    border: none;
    background: transparent;
    position: fixed;
    top: 61%;
    left: 44%;
    right: 0;
    bottom: 0;

  img{
    width: 100%;
    cursor: pointer;
    max-width: 120px;

    filter: drop-shadow(0 7.5px 2.15rem rgba(0, 0, 0, 0.847));
  }
`

export const StatisticsInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 1rem 0;

  & > div{
    font-size: 1.2rem;
    font-weight: bold;
    text-transform: uppercase;
    margin: 0.1rem 0;
  }
`

export const StaticsContainer = styled.div`
  display: flex;
    justify-content: space-between;
    width: 100%;

    div{
      display: flex;
      align-items: center;
      span{
        font-weight: bold;
      }


      img{
        margin-right: 1rem;
        align-self: center;
      }
    }

    h3{
      text-transform: uppercase;
      font-weight: bold;
    }

    span{
      font-size: 1.2rem;
      text-transform: uppercase;
      font-weight: bold;
      margin: 1rem 0.5rem;
    }

`

export const EditNamePokemon = styled.div`
  display: flex;
  align-items: center;
  margin: 2rem 0;

  button{
    background: #fefe;
    height: 45px;
    margin: 0 0.5rem;
    width: 45px;
    border:0;
    cursor: pointer;
    border-radius: 4px;
    box-shadow: 0 10px 1.6rem rgba(0, 0, 0, 0.247);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button:last-child {
    img{
      width: 14px;
    }
  }
`

export const Error = styled.span`
  color: #ff0000;
  position: relative;
  font-size: 1.2rem;
  left: -109px;
  top: -13px;
`;
