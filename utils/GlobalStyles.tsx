import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
    *{
        box-sizing:border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: inherit;
    }
    body{
        margin:0;
        font-size:16px;
        font-family: 'Fira Sans', sans-serif;
    }
`;
