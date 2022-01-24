import React, { useState } from 'react';
import Modal  from 'react-modal';
import { motion } from "framer-motion"

import * as S from './styles';
import axios from 'axios';
import capitalize from 'utils/capitalize';
import { Ash } from '../Ash';

interface PokemonProps {
  lenght: number;
  name: string;
  weight: number;
  height: number;
  sprites : {
    front_default: string;
  }
}

interface ModalProps {
  onHandleCatchedPokdemon : (info: any) => void;
}

export function ModalGeneral({ onHandleCatchedPokdemon }: ModalProps) {
    let subtitle : any;
    const [modalIsOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [randomPokemonData, setRandomPokemonData] = useState<PokemonProps>({} as PokemonProps);

     function openModal() {
        setIsOpen(true);
     }
    
     function closeModal() {
        setIsOpen(false);
      }

      function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
      }

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
    };


    function generatePokemonId() {
      const idPokemon = Math.floor((Math.random() * 897)+1)
      return idPokemon
    }

    async function handleGetRandomPokemon(){
          
          try{
            setIsLoading(true);
            let pokemonId = generatePokemonId();

            const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
            const pokemonData = response.data;
            setRandomPokemonData(pokemonData);
            openModal()
            
          } catch(e){
            console.log(e)
          } finally{
            setInterval(() => {
              setIsLoading(false);
            }, 1000);
          }
            
    }


    // if(isLoading){
    //   return(
    //       <h1>Carregando...</h1>
    //   )
    // }

      return ( 
        <S.ModalContainer>
           <Ash onHandleGetRandomPokemon={handleGetRandomPokemon} isSearching={isLoading} />
            {/* <button onClick={() => {
              openModal()
              handleGetRandomPokemon()
            }}>Open Modal</button> */}
            
            {modalIsOpen && (
                <Modal
                    isOpen={modalIsOpen}
                    onAfterOpen={afterOpenModal}
                    onRequestClose={closeModal}
                    style={customStyles}
                    contentLabel="Example Modal"
                >
                    <img src={randomPokemonData?.sprites?.front_default} alt="" />
                    {`${capitalize(randomPokemonData?.name)}`} <br/>
                    
                    HP       ALTURA      PESO
                    45/45     {randomPokemonData?.height}CM   {randomPokemonData?.weight}KG
                    <br />
                    <button type="button" onClick={() => {
                        onHandleCatchedPokdemon(randomPokemonData)
                        closeModal()
                      }}>
                      CAPTURAR
                    </button>
                </Modal>
            )}
        </S.ModalContainer>
      );

  }
