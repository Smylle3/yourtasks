import styled from "styled-components";

export const ContainerMenuPlus = styled.header`

@media (max-width: 930px) {
        display: flex;
        justify-content: center;
        position: fixed;
        bottom: 7em;
        right: 1em;
        left: 1em;
    }
`

export const PlusButton = styled.button`
    cursor: pointer;
    min-width: 3em;
    min-height: 3em;
    border-radius: 50%;
    border: 0 none;
    box-shadow: 3px 3px 15px -5px black;
    background-color: transparent;
    transition: .3s;

    :active {
        box-shadow: 0 0 0 0 transparent;
    }
`