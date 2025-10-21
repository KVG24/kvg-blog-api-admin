import styled from "styled-components";
import { Link } from "react-router-dom";
import { useState } from "react";

const BLOG_API = import.meta.env.VITE_API_URL;

export default function BlogCard({
    id,
    title,
    description,
    createdAt,
    updatedAt,
    published,
}) {
    const [deletion, setDeletion] = useState(false);

    function convertDate(date) {
        return new Date(date).toLocaleString("en-US", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: false,
        });
    }

    async function handleDelete() {
        try {
            const response = await fetch(`${BLOG_API}/posts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
            });

            if (!response.ok) throw new Error("Failed to delete post");

            window.location.href = "/";
        } catch (err) {
            console.error(err);
        }
    }

    if (deletion) {
        return (
            <>
                <Container>
                    <p>Delete {title}?</p>
                    <DeleteBtnsContainer>
                        <DeleteBtn type="button" onClick={() => handleDelete()}>
                            Yes
                        </DeleteBtn>
                        <AbortDeleteBtn
                            type="button"
                            onClick={() => setDeletion(false)}
                        >
                            No
                        </AbortDeleteBtn>
                    </DeleteBtnsContainer>
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
            {published ? (
                <Status $published>Published</Status>
            ) : (
                <Status>Unpublished</Status>
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
        outline: 10px solid #449b9b;
        outline-offset: -10px;
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

const Status = styled.p`
    position: absolute;
    bottom: 10px;
    right: 10px;
    padding: 0.2rem 0.5rem;
    border-radius: 5px;
    background-color: ${(props) => (props.$published ? "#115320" : "#681010")};
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
`;

const DeleteBtnsContainer = styled.div`
    display: flex;
    gap: 1rem;
`;

const DeleteBtn = styled.button`
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    background-color: #851111;
`;

const AbortDeleteBtn = styled.button`
    border: none;
    border-radius: 3px;
    cursor: pointer;
    padding: 0.2rem 0.5rem;
    background-color: #7a7a7a;
`;
