import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @import url("https://fonts.googleapis.com/css2?family=IBM+Plex+Serif:wght@100;200;300;400;500;600;700&display=swap");
    :root {
        --color-one: #096dd9;
        --color-two: #6267d0;
        --color-three: #8762c4;
        --color-for: #a15eb6;
        --color-five: #b35ca7;
        --color-six: #bf5c99;
        --color-green: #87d068;
        --color-blue: #108ee9;

        --light-color: #e8efff;
        --dark-color: #181b29;
    }

* {
    margin: 0;
    padding: 0;
    font-family: "IBM Plex Serif", serif;
}

::-webkit-scrollbar {
    width: 0; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
}
`