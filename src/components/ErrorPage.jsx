import { Link } from "react-router-dom";
import styled from "styled-components";

export default function ErrorPage() {
    return (
        <Container>
            <ErrorCode>404</ErrorCode>
            <h1>Oh no, this page doesn't exist!</h1>
            <StyledLink to="/">Home</StyledLink>
        </Container>
    );
}

const Container = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const StyledLink = styled(Link)`
    padding: 0.5rem 1rem;
    color: black;
    border-radius: 3px;
    background-color: #449b9b;
    text-decoration: none;
    transition: all 0.1s ease-in-out;

    &:hover {
        background-color: black;
        color: #449b9b;
    }
`;

const ErrorCode = styled.p`
    font-size: 5rem;
    font-weight: 900;
    color: #449b9b;
`;
