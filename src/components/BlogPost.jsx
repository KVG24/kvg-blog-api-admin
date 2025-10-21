import { useParams } from "react-router-dom";
import styled from "styled-components";
import useFetch from "../hooks/useFetch";
import NavigationBar from "./NavigationBar";
import BlogPostSkeletonLoader from "./BlogPostSkeletonLoader";
import DOMPurify from "dompurify";

const BLOG_API = import.meta.env.VITE_API_URL;

export default function BlogPost() {
    const { id } = useParams();
    const { data, loading, error } = useFetch(`${BLOG_API}/posts/${id}`);

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

    if (loading) return <BlogPostSkeletonLoader />;
    if (error) return <Error />;

    return (
        <>
            <NavigationBar />
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
    width: 100%;
    background-color: #3d3d3d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
`;

const Dates = styled.div`
    font-size: 0.8rem;
    display: flex;
    flex-direction: column;
    position: relative;
    top: -70px;
`;

const TextZone = styled.div`
    padding: 1rem;
    max-width: 1000px;
    width: 100%;
    position: relative;
`;
