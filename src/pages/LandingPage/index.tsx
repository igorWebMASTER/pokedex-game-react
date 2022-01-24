import React from 'react';
import  Button from 'components/Button'
import * as Styled  from './styles'

import pokemonLogo from 'assets/images/pokemonLogo.png'
import { Link } from 'react-router-dom';

export  function LandingPage() {
  return (
    <Styled.ContainerHomeScreen>
        <Styled.ContentHome>
            <Styled.Logo>
                <img src={pokemonLogo} alt="" />
            </Styled.Logo>
            <Styled.HomeContent>
                <Link to="/game">
                    <Button
                        text={'START'}
                        icon=""
                        onClick={() => {}}
                        onlyIcon="false"
                 />
               </Link>
            </Styled.HomeContent>
        </Styled.ContentHome>
    </Styled.ContainerHomeScreen>
  )
}
