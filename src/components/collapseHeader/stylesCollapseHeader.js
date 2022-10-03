import styled from "styled-components"

export const Extra = styled.header`
    display: flex;
    width: 100%;
`

export const TitleCollapse = styled.p`
    margin: 0;
    width: 33%;
`

export const DateTask = styled.p`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0;
    width: 33%;
`

export const ButtonGroupCollapse = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 33%;
`

export const CheckButton = styled.button`
    border: 0 none;
    border-radius: 5px;
    padding: 0 5px;
    background-color: transparent;
    transition: all .5s;
    cursor: pointer;
    :hover, :active{
        background-color: #000;
        color: #fff;
    }
`