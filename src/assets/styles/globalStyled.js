import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  // create root css variables
  :root {
    --primary-default: #00D68F;
    --primary-dark: #004A45;
    --primary-transparent: rgba(0, 214, 135, 0, 48);
    --action-dark: rgba(219, 44, 102, 1);
    --action-default: rgba(255, 61, 113, 1);

    --type-normal: rgba(196, 192, 180, 1);
    --type-eletric: rgba(224, 141, 0, 1);
    --type-fighting: rgba(133, 40, 22, 1);

    --modal-background: rgba(0, 0, 0, 0.35);
  }


  * {
    box-sizing: border-box;
    margin: 0;
    outline: 0;
    padding: 0;
  }

  html {
    font-size: 62.5%;
    -ms-overflow-style: scrollbar;
  }

  html,
  body {
    height: 100%;
    font-family: 'Open Sans', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::-webkit-scrollbar{
    width: 1px;
    height: 1px;
  }
  

  body {
 
    color: #222;
  }

  img, picture, video, canvas, svg {
    display: block;
    max-width: 100%;
  }

  a,
  p,
  span,
  label,
  div,
  b,
  i,
  strong,
  ul,
  li,
  input,
  textarea,
  select,
  td,
  th,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6  {
    font-weight: 400;
  }

  b,
  strong {
    font-weight: 700;
  }

  p {
    font-size: 1rem;
    line-height: 1.6;
  }

  input ,
  select {
    appearance: none;
  }

  ul {
    list-style: none;
  }
`
