import styled from "styled-components"

export const Extra = styled.header`
    display: flex;
    width: 100%;

    @media (max-width: 930px) {
        padding: .5em 1em;
    }
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
    :active{
        background-color: #000;
        color: #fff;
    }
    @media (min-width: 931px){
        :hover{
            background-color: #000;
            color: #fff;
        }   
    }
`

export const Priority = styled.div`
    display: flex;
    flex-direction: row;
    align-items:center;
    gap: .5em;
    margin-right: 1em;

`

export const DotPriority = styled.div`
    height: 7px;
    width: 7px;
    background-color: ${props=>props.color};
    border-radius: 50%;
`

export const TextPriority = styled.p`
    margin: 0;
    color: ${props=>props.color};
    @media (max-width: 931px) {
        display: none;
    }
`