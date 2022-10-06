import styled from "styled-components";

export const SlideButton = styled.button`
    display: flex;
    align-items: center;
    gap: .5em;

    position: fixed;
    bottom: 7em;
    left: ${props => props.left};
    right: ${props => props.right};
    
    background-color: transparent;
    color: #000;
    border: 1px solid ${props => props.disabled ? "#000" : "#fff"};
    border-radius: 5px;
    
    box-sizing: border-box;
    padding: .5em 1em;
    cursor: pointer;
    transition: all .3s;
`