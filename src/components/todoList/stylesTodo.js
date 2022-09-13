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

export const TodoHeader = styled.header`
    display: flex;
    justify-content: space-between;
    align-items: center;

    height: auto;
    margin-bottom: 2em;
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
    gap: 1em;
    @media (max-width: 930px) {
        padding: 0 0 1em 0;
    }
`

export const Task = styled.section`
    display: flex;
    align-items: center;

    box-sizing: border-box;

    border: 1px solid ${props => props.border};
    border-radius: 5px;
`

export const TaskContent = styled.div`
    display: flex;
    align-items: center;
    width: 100%;
    padding: .5em 0 .5em 1em;
    cursor: pointer;
`

export const TitleTask = styled.h3`
    margin: 0;
    padding: 0;
    width: 50%;
`

export const DateTask = styled.p`
    margin: 0;
    padding: 0;
    width: 50%;
`

export const CheckButton = styled.button`
    border: 0 none;
    border-radius: 5px;
    padding: .5em;
    margin-right: .5em;
    background-color: transparent;
    transition: all .5s;
    cursor: pointer;
    :hover, :active{
        background-color: #000;
        color: #fff;
    }
`

export const SpinDiv = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const LocalTitle = styled.h2`
    position: fixed;
    margin: 0;
    top: 1em;
    right: 1em;
    left: 1em;
    display: flex;
    justify-content: center;
    box-sizing: border-box;
    border-radius: 5px;
    box-shadow: 0px 0px 12px -7px #000;
`