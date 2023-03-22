import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    background-color: #16171b;
    background-image: url(https://uploads-ssl.webflow.com/62e3ee10882dc50bcae8d07a/631a5d4631d4c55a475f3e34_noise-50.png);
    background-position: 0px 0px;
    background-size: 200px 200px;
    font-family: 'Poppins', sans-serif;
    color: #fff;
    font-size: 1rem;
    line-height: 1.5;
    font-weight: 300;
  }
  a {
    text-decoration: none;
    color: #fff;
  }
  h1 {
    padding: 0;
    margin: 0;
  }
  @font-face {
  font-family: 'Poppins';
  src: url('https://fonts.googleapis.com/css2?family=Poppins:wght@200;300;400;500;600;700;800;900&display=swap');
  }
`

export default GlobalStyle
