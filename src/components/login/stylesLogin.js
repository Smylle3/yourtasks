import styled from "styled-components";

export const LoginPage = styled.div`
    background-image: linear-gradient(var(--color-one), var(--color-for));
    min-height: 100vh;
    min-width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const LoginCard = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    text-align: center;
    background-color: var(--light-color);

    box-shadow: 0 0 10px 1px var(--dark-color);
    border-radius: 3px;
    padding: 2rem;
    cursor: default;
`

export const LoginTitle = styled.header`
    display: flex;
    flex-direction: row;
    align-items: center;
`

export const LoginIcon = styled.img`
    height: 30px;
    width: 30px;
`

export const LoginTitleText = styled.h2`
    margin: 1rem 1rem;
    font-weight: 300;
`
export const LoginButton = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
    cursor: pointer;
    
    padding: 12px;
    border-radius: 5px;
    width: 100%;
    margin: 5px 0;
    transition: 0.3s;
    
    color: var(--light-color);
    border: 2px solid ${(props) => props.border};
    background-color: ${(props) => props.color};

    :hover {
        background-color: transparent;
        color: ${(props) => props.border};
    }

`

export const LoginLoading = styled.button`
    cursor: default;
    display: flex;
    align-items: center;
    justify-content: center;

    padding: 12px;
    width: 100%;
    margin: 5px 0;
    border-radius: 5px;
    border: 2px solid ${(props) => props.border};
    background-color: transparent;
`