import styled from "styled-components";

export const SettingUserMenu = styled.section`
    display: flex;
    flex-direction: column;
    gap: 1em;
`
export const SettingsButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: .5em;

    border: 1px solid ${props => props.border};
    border-radius: 4px;
    color: #000;
    background-color: #fff;
    width: 100%;
    height: 2.5em;
    padding: 0 .5em;
    transition: 0.5s;
    cursor: pointer;

    :hover{
        color: #fff;
        border-color: #000;
        background-color: #000;
    }
`