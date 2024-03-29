import styled from 'styled-components'

export const TodoPage = styled.main`
    box-sizing: border-box;
    padding: 0 10em;
    @media (max-width: 930px) {
        position: fixed;
        bottom: 7em;
        right: 0;
        left: 0;
        top: 0;

        display: flex;
        flex-direction: column-reverse;
        gap: 1em;
        padding: 0 1em;
    }
`

export const ContainerDesktop = styled.div`
    @media (max-width: 930px){
        display: none;
    }
`

export const ContainerMobile = styled.div`
    @media (min-width: 931px){
        display: none;
    }
`

export const TodoHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: auto;
    @media (max-width: 930px) {
        justify-content: center;
    }
`

export const SelectTabButton = styled.button`
    padding: .5em .5em;
    background-color: transparent;
    border: 1px solid ${props => props.borderSelect};
    border-radius: 5px;
    transition: all .5s;
    cursor: pointer;

    :hover {
        border: 1px solid #000;    
    }
`

export const TaskList = styled.div`
    display: flex;
    flex-direction: column-reverse;
    height: 100%;
    @media (max-width: 930px) {
        padding: 0 0 1em 0;
    }
`

export const SpinDiv = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const TasksUnit = styled.div`
    display: flex;
    align-items: center;
    box-sizing: border-box;
    border: 1px solid ${props => props.border};
    border-radius: 5px;
`

export const TaskGroup = styled.div`
    display: flex;
    flex-direction: column-reverse;
    gap: 1em;
    overflow-y: scroll;
    height: 76vh;
    padding-top: 1em;

    @media (min-width: 931px) {
        display: none;
    }
`