import React, { useState } from "react";

import Button from "components/Button";

import iconPlus from "assets/images/plus.png";

import * as S from "./styled";
import { ModalPokemonInfo } from "../ModalPokemonInfo";
import { ModalAddPokemon } from "../ModalAddPokemon";


const Sidebar = ({ catchedPokemons , onHandleReleasePokemon, onHandleAddCustomPokemon }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalAddCustomPokemon, setModaAddCustomPokemon] = useState(false);

  const [selectedPokemonData, setSelectedPokemonData] = useState([]);

  function handleOpenCatchedPokemonModal(){
    setIsOpen(!modalIsOpen);
  }
  
  function handleOpenAddPokemonModal(){
    setModaAddCustomPokemon(!modalAddCustomPokemon);
  }

  function handleAddCustomPokemon(data){
    onHandleAddCustomPokemon(data)
    setModaAddCustomPokemon(!modalAddCustomPokemon)
  }

  return (
    <S.SideBarWrapper>
    <ModalPokemonInfo 
        onHandleReleasePokemon={onHandleReleasePokemon} 
        requestCloseModal={handleOpenCatchedPokemonModal}
        openCloseModal={modalIsOpen} 
        pokemonData={selectedPokemonData}
    />
    <ModalAddPokemon 
       onHandleAddCustomPokemon={handleAddCustomPokemon}
       requestCloseModal={handleOpenAddPokemonModal}
       openCloseModal={modalAddCustomPokemon}
    />
    <S.SideBarList>
      {catchedPokemons.map((pokemon, index) => {
        return (
          <S.SideBarItem key={index} isUsed={pokemon.id}>
            {pokemon?.id ?
               <img 
                  loading={"eager"}
                  onError={(e) => {
                    e.target.src = "https://greenvolt.com.br/wp-content/uploads/2018/05/ef3-placeholder-image.jpg";
                  }} 
                   onClick={() => {
                     handleOpenCatchedPokemonModal();
                     setSelectedPokemonData(pokemon);
                   }}
                   src={pokemon?.sprites?.front_default ?? "https://png.pngtree.com/png-vector/20210604/ourmid/pngtree-gray-network-placeholder-png-image_3416659.jpg"} 
                   alt={pokemon?.name} 
                />
                : "?"}
          </S.SideBarItem>
          )
      }).reverse()}
    </S.SideBarList>

    <Button onClick={handleOpenAddPokemonModal} icon={iconPlus} />
  </S.SideBarWrapper>
  )
};

export default Sidebar;
