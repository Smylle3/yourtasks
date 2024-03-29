import styled from "styled-components";

export const ContainerPriority = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: .5em;

    color: ${props => props.color};
`

export const ButtonPriority = styled.button`
    border: 0;
    background-color: transparent;
    color: ${props => props.color};
    cursor: pointer;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: .5em;
`

export const DotPriority = styled.div`
    height: 7px;
    width: 7px;
    background-color: ${props => props.color};
    border-radius: 50%;
`

/*ICON DO SORT*/
export const SortIcon = styled.button`
    position: fixed;

    border-radius: 50px;
    border: 0;
    background-color: rgba(0, 0, 0, .2);
    transition: all .2s;
    z-index: 100;
    cursor: pointer;

    :active {
        background-color: #fff;
    }
    @media (max-width: 930px){
        left: 1em;
        top: 2em;
        min-width: 2.5em;
        min-height: 2.5em;
    }
    @media (min-width: 931px){
        right: 1em;
        bottom: 2em;
        min-width: 3em;
        min-height: 3em;
        /* &::after {
            content: "";
            position: absolute;
            top: 0;
            right: 50%;
            height: 100%;
            width: 0;
            transition: all .5s;
            z-index: -1;
            background-color: rgba(0, 0, 0, .2);
        }
        :hover{
            &::after {
                content: "";
                height: 100%;
                width: 300%;
            }
        } */
    }
`