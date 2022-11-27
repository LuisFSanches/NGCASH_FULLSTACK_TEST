import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    :root{
      --black: #000000;
      --green: #04d361;
      --ligh-black: #2c2c2c;
    }

    ::-webkit-scrollbar{width:6px; height: 10px;border-left:1px solid #E6ECF8;}

    *{
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      max-height: 100vh;
    }

    body{
      background: #fafafa;
      overflow-y: auto;
    }

    html{
      @media(max-width: 1080px) {
          font-size: 93.75%; // 15px
      }
      @media(max-width: 720px){
          font-size: 87.5%;
      }
    }

    h1, h2, h3, h4, h5, strong, th, td, label {
      font-family: 'Ubuntu', sans-serif;
      font-weight: 500;
    }
    p, a, label, span,{
      font-family: 'Roboto', sans-serif;
    }

    a{
      outline: none;
      text-decoration: none;
    }

    button {
      cursor: pointer;
      outline: none;
      border: none;
      font-size: 1.15rem;
      font-weight: 500;
      background: none;
    }

    input,textarea,select {
      font-size: 1rem;
      font-family: 'Roboto', sans-serif;
      border: none;
      outline: none;
    }
    
    .react-modal-overlay {
      background: rgba(0,0,0,0.5);
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      border: 0;
      right: 0;
      left: 0;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .react-modal-content {
      width: 100%;
      max-width: 430px;
      background: #222222;
      padding:2rem 2.2rem;
      position: relative;
      border-radius: 0.25rem;
      color: #fff;
    }
    .react-modal-sideMenu {
      height: 100%;
      width: 18rem;
      background: var(--dark-purple);
      position: absolute;
      top: 0;
      right: 0;
    }
`;
