import useFetch from "../hooks/useFetch";
import BlogListSkeletonLoader from "./BlogListSkeletonLoader";
import BlogCard from "./BlogCard";
import styled from "styled-components";
import NavigationBar from "./NavigationBar";

export default function Login() {
    const BLOG_API = import.meta.env.VITE_API_URL;

    const { data, loading, error } = useFetch(`${BLOG_API}/posts`);

    if (loading) return <BlogListSkeletonLoader />;
    if (error) return <Error />;

    return (
        <>
            <NavigationBar />
            <TitleZone>
                <h1>KVG Blog</h1>
            </TitleZone>
            <Container>
                {data && data.length > 0 ? (
                    data.map((blogpost) => (
                        <BlogCard
                            id={blogpost.id}
                            key={blogpost.id}
                            title={blogpost.title}
                            description={blogpost.description}
                            createdAt={blogpost.createdAt}
                            updatedAt={blogpost.updatedAt}
                            published={blogpost.published}
                        />
                    ))
                ) : (
                    <p>No items available</p>
                )}
            </Container>
        </>
    );
}

const Container = styled.div`
    max-width: 1000px;
    margin: 1rem auto 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

const TitleZone = styled.div`
    width: 100%;
    background-color: #3d3d3d;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
    border-radius: 5px;
`;

const Error = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
`;
