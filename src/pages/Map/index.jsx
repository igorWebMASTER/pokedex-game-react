import React, { useEffect, useState } from "react";

import Sidebar from "components/Sidebar";

import * as S from "./styled";

import { ModalGeneral } from "components/Modal";



const MapPage = () => {
  const [slots, setSlots] = useState(() => {
    const data = localStorage.getItem("@pokedex");
    const parsedData = data ? JSON.parse(data) : [];

    console.log(parsedData)

    if(parsedData.length <= 0 ) return Array(6).fill([]);

    return parsedData;
  });

  useEffect(() => {
    console.log(slots)
  }
  , [slots]);


  useEffect(() => {
    const newData = {
      ...slots,
    }

    console.log(slots)

      localStorage.setItem('slots', JSON.stringify(slots));
  }, [slots]);

  const addPokemonToSlots = (pokemon) => {
    if (slots.find((slot) => slot.id === pokemon.id)) return;
      slots.map((slot, index) => {
        if (!slot.id) {
          console.log(slots[index])
          setSlots([
            ...slots.slice(0, index),
            pokemon,
            ...slots.slice(index + 1),
          ]);
        }

        return slots;
      });

      localStorage.setItem('slots', JSON.stringify(slots));
  };


  function handleReleasePokemon(pokemonId){
    if(!pokemonId) return;

    if (slots.find((slot) => slot.id === pokemonId)) 
    {
      const newSlots = slots.map((pokemon) => {
        if(pokemon.id === pokemonId) return []
        return pokemon
      });

      setSlots(newSlots);

    };

    localStorage.setItem('slots', JSON.stringify(slots));
  }

  function handleAddCustomPokemon(data){
    const newPokemonData = {
      ...data,
      id: Math.random()
    }
    console.log(`sadasd`)
    alert(`das`)
    console.log(data)

    if (slots.find((slot) => slot.name === data.name)) return;
      slots.map((slot, index) => {
        if (!slot.id) {
          setSlots([
            ...slots.slice(0, index),
            newPokemonData,
            ...slots.slice(index + 1),
          ]);
        }

        return slots;
      });

  }

  return (
    <S.MapWrapper className="map">
      <Sidebar 
        catchedPokemons={slots} 
        onHandleReleasePokemon={handleReleasePokemon} 
        onHandleAddCustomPokemon={handleAddCustomPokemon} 
      />
      <ModalGeneral onHandleCatchedPokdemon={addPokemonToSlots} />
  </S.MapWrapper>
  )
};

export default MapPage;
