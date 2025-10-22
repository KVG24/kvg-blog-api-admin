import { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import convertDate from "../utils/convertDate";
import useAPI from "../hooks/useAPI";

export default function BlogCard({
    id,
    title,
    description,
    createdAt,
    updatedAt,
    published,
    setPostList,
}) {
    const [publishedState, setPublishedState] = useState(
        published === "on" || published === true ? "on" : ""
    );

    const [statusChange, setStatusChange] = useState(false);
    const [deletion, setDeletion] = useState(false);
    const { deletePost, editPost } = useAPI();

    const handleDelete = async () => {
        const deletedPost = await deletePost(id);
        if (deletedPost) {
            // filter deleted post out of postList
            setPostList((prev) =>
                prev.filter((post) => post.id !== deletedPost.id)
            );
        }
    };

    const handleStatusChange = async () => {
        // toggle status
        const toggledPublished = publishedState === "on" ? "" : "on";
        const postData = {
            id,
            published: toggledPublished,
        };

        const updatedPost = await editPost(postData);
        if (updatedPost) {
            // change status in postList right away
            setPostList((prev) =>
                prev.map((post) =>
                    post.id === updatedPost.id
                        ? { ...post, published: updatedPost.published }
                        : post
                )
            );
            setPublishedState(updatedPost.published === true ? "on" : "");
            setStatusChange(false);
        }
    };

    if (deletion) {
        return (
            <>
                <Container>
                    <p>Delete "{title}"?</p>
                    <AlertBtnsContainer>
                        <AlertBtn $confirm type="button" onClick={handleDelete}>
                            Yes
                        </AlertBtn>
                        <AlertBtn
                            type="button"
                            onClick={() => setDeletion(false)}
                        >
                            No
                        </AlertBtn>
                    </AlertBtnsContainer>
                </Container>
            </>
        );
    }

    if (statusChange) {
        return (
            <>
                <Container>
                    {publishedState ? (
                        <p>Unpublish "{title}"?</p>
                    ) : (
                        <p>Publish "{title}"?</p>
                    )}

                    <AlertBtnsContainer>
                        <AlertBtn
                            $confirm
                            type="button"
                            onClick={handleStatusChange}
                        >
                            Yes
                        </AlertBtn>
                        <AlertBtn
                            type="button"
                            onClick={() => setStatusChange(false)}
                        >
                            No
                        </AlertBtn>
                    </AlertBtnsContainer>
                </Container>
            </>
        );
    }

    return (
        <Container>
            <Link
                to={`/post/${id}`}
                style={{ textDecoration: "none", color: "inherit" }}
            >
                <p>{title}</p>
                <Description>{description}</Description>
                <Dates>
                    <p>Posted: {convertDate(createdAt)}</p>
                    {updatedAt && updatedAt !== createdAt && (
                        <p>Updated: {convertDate(updatedAt)}</p>
                    )}
                </Dates>
            </Link>
            {publishedState ? (
                <AlertStatusChangeBtn
                    onClick={() => setStatusChange(true)}
                    $published
                >
                    Published
                </AlertStatusChangeBtn>
            ) : (
                <AlertStatusChangeBtn onClick={() => setStatusChange(true)}>
                    Unpublished
                </AlertStatusChangeBtn>
            )}
            <AlertDeleteBtn type="button" onClick={() => setDeletion(true)}>
                X
            </AlertDeleteBtn>
        </Container>
    );
}

const Container = styled.div`
    border: 1px solid white;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.7rem;
    cursor: pointer;
    box-sizing: border-box;
    transition: all 0.05s ease-in;
    position: relative;
    width: 400px;

    &:hover {
        outline: 5px solid #449b9b;
        outline-offset: -5px;
    }

    a {
        width: 80%;
    }
`;

const Description = styled.p`
    margin-bottom: 2rem;
`;

const Dates = styled.div`
    color: #8f8e8e;
    font-size: 0.8rem;
    position: absolute;
    bottom: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
`;

const AlertStatusChangeBtn = styled.button`
    border: none;
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 0.3rem 0.6rem;
    border-radius: 5px;
    background-color: ${(props) => (props.$published ? "#115320" : "#681010")};
    cursor: pointer;

    &:hover {
        outline: 1px solid white;
        outline-offset: -1px;
    }
`;

const AlertDeleteBtn = styled.button`
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    position: absolute;
    top: 10px;
    right: 10px;
    background-color: #851111;
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;

    &:hover {
        outline: 1px solid white;
        outline-offset: -1px;
    }
`;

const AlertBtnsContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const AlertBtn = styled.button`
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    background-color: ${(props) => (props.$confirm ? "#115320" : "#681010")};

    &:hover {
        outline: 1px solid white;
        outline-offset: -1px;
    }
`;
