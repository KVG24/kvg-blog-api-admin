import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import convertDate from "../utils/convertDate";
import DOMPurify from "dompurify";
import NavigationBar from "./NavigationBar";
import BlogPostSkeletonLoader from "./BlogPostSkeletonLoader";

const BLOG_API = import.meta.env.VITE_API_URL;

export default function BlogPost() {
    const { id } = useParams();
    const { data, loading, error } = useFetch(`${BLOG_API}/posts/${id}`);

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
