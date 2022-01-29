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
  z-index: 90;
`
export const ModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  height: 380px;
  min-height: 520px;
  max-height:520px;
  width: 100%;
  min-width:35rem;
  overflow: scroll;
  position: relative;

  /* min-width: 350px; */
  border-radius: 10px;
  box-shadow: 0 0 60px rgba(0, 0, 0, 0.05);
  text-align: center;
  position: relative;

  @media screen and (max-width: 35rem) {
    min-width:32rem;
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

    position: relative;
    left: 12px;
    top: -1px;
  }

  div{
    z-index: 999;
    width: 60%;
    height: 210px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius:50%;
    background: #fff;
    border: 4px solid var(--primary-default);
  position: relative;
    top: -20px;

    

    img{
      width: 100%;
      max-width: 120px;
    }


  }
`

export const ModalBody = styled.div`  
  display: flex;
  height: 540px;
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
  margin-top: 5rem;
  color: #004a45;

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

export const HorizontalLine = styled.div`
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

export const TypeInfoContainer = styled.div`
  display: flex;
  margin: 1.7rem 0;
  justify-content: center;
  width: 100%;
`

export const Badge = styled.div<{ color: string }>`
    width: 30%;
    display: flex;
    margin: 0 0.7rem;
    text-transform: uppercase;
    border-radius: 16px;
    align-items: center;
    justify-content: center;
    padding: 0.7rem;
    background-color: green;
    color:#fff;
    font-size: 1.2rem;
    font-weight: bold;
    background-color: ${props => props.color};

   
  `;

export const AbilitiesInfoContainer = styled.div`
    display: flex;
  
    span{
      font-size: 1.2rem;
      text-transform: uppercase;
      font-weight: bold;
      margin: 1.4rem 0.5rem;
    }
  
  `

export const CaptureButtonContainer = styled.div`
    display: flex; 
`

export const ButtonCatchPokemon = styled.button`
    border: none;
    background: transparent;
    position: fixed;
    top: 72%;
    max-width: 120px;
    width: ;
    margin: 0% auto;
    left: 0;
    right: 0; 

    img{
      width: 100%;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      max-width: 120px;
      filter: drop-shadow(0 7.5px 2.15rem rgba(0, 0, 0, 0.647));
    }
`