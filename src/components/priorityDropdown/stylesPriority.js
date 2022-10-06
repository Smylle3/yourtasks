import styled from "styled-components";

export const ContainerPriority = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .5em;

    color: ${props=>props.color};
`

export const ButtonPriority = styled.button`
    border: 0;
    background-color: transparent;
    color: ${props=>props.color};
    cursor: pointer;

    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .5em;
`

export const DotPriority = styled.div`
    height: 7px;
    width: 7px;
    background-color: ${props=>props.color};
    border-radius: 50%;
`