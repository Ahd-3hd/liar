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
        font-family: 'Poppins', sans-serif;
        background: radial-gradient(67.33% 101.9% at 51.53% 32.67%, rgba(255, 255, 255, 0) 0%, ${({
          theme: { colors },
        }) => colors.grey} 100%);
    }
`;
