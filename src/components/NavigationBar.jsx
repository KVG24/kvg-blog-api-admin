import { Link } from "react-router-dom";
import styled from "styled-components";
import isLoggedIn from "../utils/isLoggedIn";

export default function NavigationBar() {
    return (
        <>
            <StyledNav>
                <ul style={{ listStyleType: "none" }}>
                    <li>
                        <StyledLink $left="1rem" to="/">
                            Back
                        </StyledLink>
                    </li>
                    {!isLoggedIn ? (
                        <li>
                            <StyledLink $right="1rem" to="/login">
                                Login
                            </StyledLink>
                        </li>
                    ) : (
                        <li>
                            <StyledLink
                                $right="1rem"
                                to="/login"
                                onClick={() => {
                                    localStorage.removeItem("jwtToken");
                                }}
                            >
                                Log Out
                            </StyledLink>
                        </li>
                    )}
                </ul>
            </StyledNav>
        </>
    );
}

const StyledLink = styled(Link)`
    padding: 0.5rem 1rem;
    color: black;
    border-radius: 3px;
    background-color: #449b9b;
    text-decoration: none;
    transition: all 0.1s ease-in-out;
    font-weight: 700;
    position: absolute;
    top: 1rem;
    left: ${(props) => props.$left || "none"};
    right: ${(props) => props.$right || "none"};

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
