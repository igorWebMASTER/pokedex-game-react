import { useUI } from "hooks/useUI";
import React from "react";

import Modal from './Modal';

import { ModalCatchPokemon } from './ModalCatchPokemon'

const ModalView = ({
  modalView,
  closeModal,
}) => {

  return (
    <Modal onClose={closeModal}>
      {modalView === "CATCH_POKEMON_VIEW" && (
        <ModalCatchPokemon />
      )}
    </Modal>
  );
};

const ModalUI = () => {
  const { displayModal, closeModal, modalView } = useUI();
  console.log({displayModal});
  console.log({modalView});

  return displayModal ? (
    <>
dasdasdas
{/* <ModalView
      modalView={modalView}
      closeModal={closeModal}
    /> */}
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
