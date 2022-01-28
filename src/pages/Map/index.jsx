import React, { useEffect, useState } from 'react';

import Sidebar from 'components/Sidebar';

import { ModalGeneral } from 'components/Modal';
import * as S from './styled';

function MapPage() {
  const [slots, setSlots] = useState(Array(6).fill([]));

  const addPokemonToSlots = (pokemon) => {
    if (slots.find((slot) => slot.id === pokemon.id)) return;
    slots.map((slot, index) => {
      if (!slot.id) {
        setSlots([
          ...slots.slice(0, index),
          pokemon,
          ...slots.slice(index + 1),
        ]);
      }
      return slots;
    });
  };

  const handleEditNamePokemon = (pokemonId, name) => {
    if (!slots.find((slot) => slot.id === pokemonId));
    slots.map((slot, index) => {
      if (slot.id === pokemonId) {
        const newSlots = {
          ...slots[index],
          name,
        }

        setSlots([
          ...slots.slice(0, index),
          newSlots,
          ...slots.slice(index + 1),
        ]);
      }

      return slots;
    });
  }

  function handleReleasePokemon(pokemonId) {
    if (!pokemonId) return;
    if (slots.find((slot) => slot.id === pokemonId)) {
      const newSlots = slots.map((pokemon) => {
        if (pokemon.id === pokemonId) return [];
        return pokemon;
      });

      setSlots(newSlots);
    }
  }

  function handleAddCustomPokemon(data) {
    const id = Math.floor(Math.random() * 1000000);
    const newPokemonData = {
      ...data,
      id: id,
    };
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
        onHandleEditNamePokemon={handleEditNamePokemon}

      />
      <ModalGeneral
        catchedPokemons={slots}
        onHandleCatchedPokdemon={addPokemonToSlots}
      />
    </S.MapWrapper>
  );
}

export default MapPage;
