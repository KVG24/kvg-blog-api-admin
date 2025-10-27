import { useState } from "react";
import styled from "styled-components";
import useAPI from "../hooks/useAPI";
import convertDate from "../utils/convertDate";

export default function Comment({
    id,
    creator,
    text,
    createdAt,
    setComments,
    postId,
}) {
    const [deletionAlert, setDeletionAlert] = useState(false);
    const { deleteComment } = useAPI();

    const handleDelete = async () => {
        const deletedComment = await deleteComment(postId, id);
        if (deletedComment) {
            // filter deleted comment out of comments state without reloading the page
            setComments((prev) =>
                prev.filter((comment) => comment.id !== deletedComment.id)
            );
        }
    };

    return (
        <>
            <Container>
                <p>
                    <strong>{creator}:</strong>
                </p>
                <Text>{text}</Text>
                <Date>{convertDate(createdAt)}</Date>
                {deletionAlert ? (
                    <DeletionAlert>
                        <p>Delete this comment?</p>
                        <AlertBtn type="button" onClick={handleDelete}>
                            Yes
                        </AlertBtn>
                        <AlertBtn
                            type="button"
                            $green
                            onClick={() => setDeletionAlert(false)}
                        >
                            No
                        </AlertBtn>
                    </DeletionAlert>
                ) : (
                    <AlertDeleteBtn
                        type="button"
                        onClick={() => setDeletionAlert(true)}
                    >
                        X
                    </AlertDeleteBtn>
                )}
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
    position: relative;
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

const AlertDeleteBtn = styled.button`
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    background-color: #851111;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;

    &:hover {
        outline: 1px solid white;
        outline-offset: -1px;
    }
`;

const DeletionAlert = styled.div`
    position: absolute;
    right: 10px;
    display: flex;
    gap: 10px;
`;

const AlertBtn = styled.button`
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    background-color: ${(props) => (props.$green ? "#115320" : "#851111")};

    &:hover {
        outline: 1px solid white;
        outline-offset: -1px;
    }
`;
