import { useState, useEffect } from "react";
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
    const [editing, setEditing] = useState(false);
    const [commentCreator, setCommentCreator] = useState("");
    const [commentText, setCommentText] = useState("");
    const { deleteComment, editComment } = useAPI();

    useEffect(() => {
        setCommentCreator(creator);
        setCommentText(text);
    }, [creator, text]);

    const handleDelete = async () => {
        const deletedComment = await deleteComment(postId, id);
        if (deletedComment) {
            // filter deleted comment out of comments state without reloading the page
            setComments((prev) =>
                prev.filter((comment) => comment.id !== deletedComment.id)
            );
        }
    };

    const handleEdit = async () => {
        const commentData = { id, creator: commentCreator, text: commentText };
        try {
            await editComment(postId, commentData);
        } catch (err) {
            console.error(err);
        }
    };

    if (editing) {
        return (
            <>
                <Container>
                    <CommentSubmitForm>
                        <CommenterNameInput
                            type="text"
                            name="creator"
                            value={commentCreator}
                            onChange={(e) => setCommentCreator(e.target.value)}
                        />
                        <CommentTextarea
                            name="text"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                    </CommentSubmitForm>
                    <BtnsContainer>
                        <SubmitCommentBtn
                            type="button"
                            onClick={() => {
                                handleEdit(), setEditing(false);
                            }}
                        >
                            Submit
                        </SubmitCommentBtn>
                        <CloseEditingBtn
                            type="button"
                            onClick={() => setEditing(false)}
                        >
                            Close editing
                        </CloseEditingBtn>
                    </BtnsContainer>
                </Container>
            </>
        );
    }

    return (
        <>
            <Container>
                <p>
                    <strong>{commentCreator}:</strong>
                </p>
                <Text>{commentText}</Text>
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
                    <BtnsContainer>
                        <EditBtn type="button" onClick={() => setEditing(true)}>
                            Edit
                        </EditBtn>
                        <AlertDeleteBtn
                            type="button"
                            onClick={() => setDeletionAlert(true)}
                        >
                            X
                        </AlertDeleteBtn>
                    </BtnsContainer>
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

const BtnsContainer = styled.div`
    display: flex;
    gap: 1rem;
    position: absolute;
    right: 10px;
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

    &:hover {
        outline: 1px solid white;
        outline-offset: -1px;
    }
`;

// Deletion

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

// Editing

const EditBtn = styled.button`
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 0.2rem 0.5rem;

    &:hover {
        outline: 1px solid white;
        outline-offset: -1px;
    }
`;

const CommentSubmitForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: flex-start;
    position: relative;
`;

const CommenterNameInput = styled.input`
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    background-color: #242424;
`;

const CommentTextarea = styled.textarea`
    padding: 1rem;
    border-radius: 5px;
    width: 100%;
    font-family: inherit;
    background-color: #242424;
`;

const SubmitCommentBtn = styled.button`
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    background-color: #115320;

    &:hover {
        outline: 1px solid white;
        outline-offset: -1px;
    }
`;

const CloseEditingBtn = styled.button`
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 0.2rem 0.5rem;

    &:hover {
        outline: 1px solid white;
        outline-offset: -1px;
    }
`;
