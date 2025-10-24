import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import styled from "styled-components";
import BlogListSkeletonLoader from "./BlogListSkeletonLoader";
import BlogCard from "./BlogCard";
import NavigationBar from "./NavigationBar";

const BLOG_API = import.meta.env.VITE_API_URL;

export default function BlogList() {
    const { data, loading, error } = useFetch(`${BLOG_API}/posts`);
    const [postList, setPostList] = useState([]);

    useEffect(() => {
        if (data) setPostList(data);
    }, [data]);

    if (loading) return <BlogListSkeletonLoader />;
    if (error) return <Error />;

    return (
        <>
            <NavigationBar mode="list" />
            <Container>
                <TitleZone>
                    <h1>KVG Blog</h1>
                </TitleZone>
                <PostContainer>
                    {postList && postList.length > 0 ? (
                        postList.map((blogpost) => (
                            <BlogCard
                                id={blogpost.id}
                                key={blogpost.id}
                                title={blogpost.title}
                                description={blogpost.description}
                                content={blogpost.content}
                                createdAt={blogpost.createdAt}
                                updatedAt={blogpost.updatedAt}
                                published={blogpost.published}
                                setPostList={setPostList}
                            />
                        ))
                    ) : (
                        <p>No items available</p>
                    )}
                </PostContainer>
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

const PostContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 1rem;
`;

const Error = styled.p`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1.5rem;
`;
