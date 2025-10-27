import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import convertDate from "../utils/convertDate";
import DOMPurify from "dompurify";
import NavigationBar from "./NavigationBar";
import BlogPostSkeletonLoader from "./BlogPostSkeletonLoader";
import useAPI from "../hooks/useAPI";

const BLOG_API = import.meta.env.VITE_API_URL;

export default function BlogPost() {
    const { id } = useParams();
    const { data, loading, error } = useFetch(`${BLOG_API}/posts/${id}`);
    const { createComment } = useAPI();
    const [commenterName, setCommenterName] = useState("");
    const [commentText, setCommentText] = useState("");
    const [comments, setComments] = useState([]);

    // load comments into local state on change
    useEffect(() => {
        if (data?.comments) {
            setComments(data.comments);
        }
    }, [data]);

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        const commentData = { creator: commenterName, text: commentText };

        try {
            const newComment = await createComment(id, commentData);

            // Append new comment to local state
            setComments((prev) => [...prev, newComment]);

            // Clear form
            setCommenterName("");
            setCommentText("");
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const navigate = useNavigate();

    const handleEdit = () => {
        navigate("/edit", {
            state: {
                id: data.id,
                title: data.title,
                description: data.description,
                content: data.content,
                published: data.published,
            },
        });
    };

    if (loading) return <BlogPostSkeletonLoader />;
    if (error) return <Error />;

    return (
        <>
            <NavigationBar />
            <EditPostBtn type="button" onClick={handleEdit}>
                Edit Post
            </EditPostBtn>
            <Container>
                <TitleZone>
                    <h1>{data.title}</h1>
                </TitleZone>
                <TextZone>
                    <Dates>
                        <p>Posted: {convertDate(data.createdAt)}</p>
                        {data.updatedAt &&
                            data.updatedAt !== data.createdAt && (
                                <p>Updated: {convertDate(data.updatedAt)}</p>
                            )}
                    </Dates>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(data.content),
                        }}
                    />
                </TextZone>
                <CommentSection>
                    <h2>Comments</h2>
                    <CommentsContainer>
                        {comments.length > 0 ? (
                            comments.map((comment) => (
                                <CommentBlock key={comment.id}>
                                    <p>
                                        <strong>{comment.creator}:</strong>
                                    </p>
                                    <CommentText>{comment.text}</CommentText>
                                    <CommentDate>
                                        {convertDate(comment.createdAt)}
                                    </CommentDate>
                                </CommentBlock>
                            ))
                        ) : (
                            <p>No comments yet</p>
                        )}
                    </CommentsContainer>
                    <h2>Leave a comment:</h2>
                    <CommentSubmitForm onSubmit={handleSubmitComment}>
                        <CommenterNameInput
                            type="text"
                            name="name"
                            placeholder="Your name"
                            value={commenterName}
                            onChange={(e) => setCommenterName(e.target.value)}
                        />
                        <CommentTextarea
                            value={commentText}
                            name="text"
                            placeholder="Leave a comment here"
                            onChange={(e) => setCommentText(e.target.value)}
                        />
                        <SubmitCommentBtn type="submit">
                            Submit
                        </SubmitCommentBtn>
                    </CommentSubmitForm>
                </CommentSection>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;

const Error = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
`;

const TitleZone = styled.div`
    border-radius: 5px;
    max-width: 1100px;
    width: 100%;
    background-color: #3d3d3d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    border: 1px solid #3d3d3d;
    box-shadow: 0px 0px 10px 5px #0f0f0f;
`;

const Dates = styled.div`
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    position: relative;
    top: -75px;
`;

const TextZone = styled.div`
    padding: 1rem;
    max-width: 1000px;
    width: 100%;
    position: relative;
`;

const EditPostBtn = styled.button`
    border: none;
    text-align: center;
    display: block;
    padding: 0.5rem 1rem;
    color: black;
    border-radius: 3px;
    cursor: pointer;
    background-color: #449b9b;
    transition: all 0.1s ease-in-out;
    font-weight: 900;
    position: absolute;
    top: 1.5rem;
    left: 50%;
    transform: translateX(-50%);

    @media (max-width: 500px) {
        padding: 0.2rem 0.5rem;
    }

    &:hover {
        background-color: black;
        color: #449b9b;
    }
`;

// Comment section styling

const CommentSection = styled.div`
    padding: 1rem;
    background-color: #3d3d3d;
    border: 1px solid #5a5959;
    box-shadow: 0px 0px 10px 5px #0f0f0f;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    max-width: 1100px;
    width: calc(100% - 0.5rem);

    & h2 {
        margin: 1rem 0 0 0;
    }
`;

const CommentSubmitForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    justify-content: center;
    align-items: flex-start;
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
    border-radius: 5px;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    background-color: #449b9b;
    color: black;
    transition: 0.1s all ease-in-out;

    &:hover {
        background-color: black;
        color: #449b9b;
    }
`;

const CommentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

const CommentBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    border: 1px solid #747474;
    padding: 0.5rem;
    border-radius: 5px;
`;

const CommentText = styled.p`
    word-break: break-word;
    background-color: #555555;
    padding: 0.5rem;
    border-radius: 5px;
    white-space: pre-wrap;
`;

const CommentDate = styled.p`
    color: #bebebe;
    font-size: 0.8rem;
`;
