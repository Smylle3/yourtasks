import styled from "styled-components";

export const InfoModal = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`

export const HeaderModal = styled.div`
    display: flex;
    flex-direction: row;
    gap: 1em;
    cursor: pointer;
`

export const ModalInput = styled.input`
    outline: 0;
    border-bottom: 1px solid #8080805f;
    border: 1px solid ${props => props.border ? props.border : "transparent"};
    border-radius: 5px;
    width: 100%;
    padding: 0 .3em;
    font-size: ${props => props.type ? props.type : "16px"};
    transition: all .5s;
    background-color: transparent;
`

export const ChecklistInput = styled.form`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 1em;
    justify-content: space-between;
    box-sizing: border-box;
`

export const InputGroup = styled.div`
    background-color: #8080801a;
    border-radius: 5px;
    transition: all .5em;
`

export const ChecklistContent = styled.div`
    padding: .5em 1em;
    gap: 1em;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #8080804d;
    border-radius: 5px;background-color: #8080801a;
`

export const Checkbox = styled.input`

`

export const LabelModal = styled.label`
    text-decoration: ${props => props.checked && "line-through"};
    width: 100%;
`

export const ButtonModal = styled.button`
    border: 0 none;
    border-radius: 5px;
    outline: 0;
    padding: .5em 1em;
    transition: all .4s;
    font-weight: 500;
    cursor: pointer;
    background-color: ${({ type }) => {
        if (type === "cancel") return "rgb(252, 104, 104)"
        else if (type === "confirm") return "rgb(106, 194, 106)"
        else if (type === "alert") return "rgb(106, 154, 194)"
    }};
    :hover {
        opacity: .6;
    }
`

export const ShowDate = styled.div`
    background-color: #8080801a;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
`

export const IconsModal = styled.div`
    cursor: pointer;
`

export const ButtonGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`

export const SimpleButton = styled.button`
    border: 0 none;
    border-bottom: 1px solid #fff;
    outline: 0;
    background-color: transparent;
    text-align: left;
    width: fit-content;
    transition: all .2s;
    cursor: pointer;
    :hover{
        border-bottom: 1px solid gray;
    }
`

export const ButtonFooterGroup = styled.footer`
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
` 