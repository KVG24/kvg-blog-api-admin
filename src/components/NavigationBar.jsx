import { Link } from "react-router-dom";
import styled from "styled-components";
import isLoggedIn from "../utils/isLoggedIn";

export default function NavigationBar({ mode }) {
    return (
        <>
            <StyledNav>
                <LinkContainer>
                    {mode !== "list" && (
                        <li>
                            <StyledLink to="/">All Posts</StyledLink>
                        </li>
                    )}
                    {mode == "list" && (
                        <li>
                            <StyledLink to="/create">Create Post</StyledLink>
                        </li>
                    )}
                    {!isLoggedIn ? (
                        <li>
                            <StyledLink to="/login">Login</StyledLink>
                        </li>
                    ) : (
                        <li>
                            <StyledLink
                                to="/login"
                                onClick={() => {
                                    localStorage.removeItem("jwtToken");
                                }}
                            >
                                Log Out
                            </StyledLink>
                        </li>
                    )}
                </LinkContainer>
            </StyledNav>
        </>
    );
}

const LinkContainer = styled.ul`
    list-style: none;
    display: flex;
    justify-content: space-between;
    width: calc(100% - 2rem);
    position: absolute;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);

    & li {
        min-width: 120px;
    }
`;

const StyledLink = styled(Link)`
    text-align: center;
    display: block;
    padding: 0.5rem 1rem;
    color: black;
    border-radius: 3px;
    background-color: #449b9b;
    text-decoration: none;
    transition: all 0.1s ease-in-out;
    font-weight: 700;

    @media (max-width: 500px) {
        padding: 0.2rem 0.5rem;
    }

    &:hover {
        background-color: black;
        color: #449b9b;
    }
`;

const StyledNav = styled.nav`
    z-index: 100;

    ul {
        padding: 0;
        margin: 0;
    }

    @media (max-width: 500px) {
        top: 0.5rem;
        left: 0.5rem;
    }
`;
