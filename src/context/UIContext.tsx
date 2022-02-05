import { createContext, useReducer, useCallback } from "react";

export interface State {
  displayModal: boolean;
  modalView: string;
}

type Action =
  | {
      type: 'OPEN_MODAL';
    }
  | {
      type: 'CLOSE_MODAL';
    }
  | {
      type: 'SET_MODAL_VIEW';
      view: MODAL_VIEWS;
 };

 type MODAL_VIEWS =
    'CATCH_POKEMON_VIEW'
 ;
  //
const initialState =  {
  displayModal: false,
  modalView: 'sdasdasd',
};

export const UIContext = createContext<State | any>(initialState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action){
  switch(action.type){
    case 'OPEN_MODAL': {
      return {
        ...state,
        displayModal: true
      }
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        displayModal: false,
      }
    }

    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view
      }
    }
  }

}


export const UIProvider = (props:any) => {
  const [state, dispatch] = useReducer(uiReducer, initialState);

  const openModal = useCallback(() => dispatch({ type: 'OPEN_MODAL '} as any), [
    dispatch,
  ]);

  const closeModal = useCallback(() => dispatch({ type: 'CLOSE_MODAL '} as any), [
    dispatch,
  ]);

  const setModalView = useCallback(
    (view: MODAL_VIEWS) => dispatch({ type: 'SET_MODAL_VIEW', view }),
    [dispatch],
  );

  return <UIContext.Provider value={{
    ...state,
    openModal,
    closeModal,
    setModalView,
  }} {...props} />
};

export const ManageUIContext = ({ children }: any) => (
  <UIProvider>
    <div>{children}</div>
  </UIProvider>
)
