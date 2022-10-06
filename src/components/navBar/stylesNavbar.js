import styled from "styled-components";

export const ContainerNavBar = styled.nav`
    margin: 1em 2em;
    box-shadow: 0px 1px 10px -3px gray;
    background-color: #fff;
    border-radius: 5px;

    font-weight: 200;
    font-size: 1.1em;
    cursor: default;

    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    height: 4em;

    @media (max-width: 930px) {
        position: fixed;
        bottom: 1em;
        left: 0;
        right: 0;
        margin: 0 1em;
    }
`

export const ImageLogo = styled.section`
    display: flex;
    align-items: center;
    font-weight: 800;
`

export const ImgLogo = styled.img`
    width: 2em;
`

export const ButtonNav = styled.button`
    cursor: pointer;
    transition: 0.5s;
    background-color: transparent;
    border: 1px solid ${props => props.selected};
    border-radius: 5px;
    box-sizing: border-box;
    padding: .1em .2em;
    display: flex;
    align-items: center;
    gap: 0.5em;

    :hover {
        border-bottom: 1px solid black;
    }
`

export const UserButtonNav = styled.button`
    display: flex;
    align-items: center;
    cursor: pointer;
    background-color: transparent;
    border: 1px solid gray;
    border-radius: 5px;
    transition: 0.5s;
    padding: 0.5em;
    font-weight: 400;

    :hover {
        background-color: #000;
        border-color: #000;
        color: #fff;
    }
`

export const LabelP = styled.p`
    margin: 0;

    @media (max-width: 930px){
        display: none;
    }
`