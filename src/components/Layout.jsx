import { useUI } from "hooks/useUI";
import React from "react";

import Modal from './Modal';
import { ModalAddPokemon } from "./ModalAddPokemon";

import { ModalCatchPokemon } from './ModalCatchPokemon'
import { ModalEditCustomPokemons } from "./ModalEditCustomPokemon";
import { ModalPokemonInfo } from "./ModalPokemonInfo";

const ModalView = ({
  modalView,
  closeModal,
}) => {

  return (
    <Modal onClose={closeModal}>
      {modalView === "CATCH_POKEMON_VIEW" && (<ModalCatchPokemon />)}
      {modalView === "INFO_POKEMON_VIEW" && (<ModalPokemonInfo />)}
      {modalView === "ADD_POKEMON_VIEW" && (<ModalAddPokemon />)}
      {modalView === "EDIT_POKEMON_VIEW" && (<ModalEditCustomPokemons />)}
    </Modal>
  );
};

const ModalUI = () => {
  const { displayModal, closeModal, modalView } = useUI();

  return displayModal ? (
    <>
      <ModalView
        modalView={modalView}
        closeModal={closeModal}
      />
    </>
  ) : null;
};

const Layout = ({ children }) => {
  return (
    <div>
      <main>{children}</main>
      <ModalUI />
    </div>
  );
};

export default Layout;
