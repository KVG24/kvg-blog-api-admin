import styled from "styled-components";
import useAPI from "../hooks/useAPI";
import convertDate from "../utils/convertDate";

export default function Comment({ id, creator, text, createdAt, setComments }) {
    return (
        <>
            <Container>
                <p>
                    <strong>{creator}:</strong>
                </p>
                <Text>{text}</Text>
                <Date>{convertDate(createdAt)}</Date>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid #747474;
    padding: 0.5rem;
    border-radius: 5px;
`;

const Text = styled.p`
    word-break: break-word;
    background-color: #555555;
    padding: 0.5rem;
    border-radius: 5px;
    white-space: pre-wrap;
`;

const Date = styled.p`
    color: #bebebe;
    font-size: 0.8rem;
`;
