import { createGlobalStyle } from 'styled-components';
import gitBackground from '../assets/1587379725719-attachment.svg';

export default createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
}
body {
    background: #F0F0F5 url(${gitBackground}) no-repeat 70% top;
    -webkit-font-smoothing: antialiased;
}
body, input, button {
    font: 16px Roboto,sans-serif;
}

button {
    cursor: pointer;
}
@keyframes fading{0%{opacity:0}50%{opacity:1}100%{opacity:0}}
.load {
 margin-top: 80px;
 animation:fading 1.5s infinite
}

#root {
    max-width: 960px;
    margin: 0 auto;
    padding: 40px 20px;
}
`;

