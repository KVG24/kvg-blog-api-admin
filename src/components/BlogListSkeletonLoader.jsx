import styled, { keyframes } from "styled-components";

export default function BlogListSkeletonLoader() {
    return (
        <>
            <TitleZone>
                <h1>KVG Blogs</h1>
            </TitleZone>
            <Container>
                {Array.from({ length: 6 }).map((_, i) => (
                    <CardSkeleton key={i}>
                        <SkeletonBlock $width="100px" $height="18px" />
                        <SkeletonBlock $width="300px" $height="40px" />
                        <SkeletonBlock
                            $width="100px"
                            $height="18px"
                            $align="flex-start"
                        />
                    </CardSkeleton>
                ))}
            </Container>
        </>
    );
}

const TitleZone = styled.div`
    width: 100%;
    background-color: #3d3d3d;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
`;

const Container = styled.div`
    max-width: 1000px;
    margin: 1rem auto 0 auto;
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;

const CardSkeleton = styled.div`
    border-radius: 5px;
    padding: 1rem;
    width: 400px;
    background-color: #4b4b4b;
    display: flex;
    flex-direction: column;
    gap: 0.7rem;
    align-items: center;
    box-sizing: border-box;
`;

const shimmer = keyframes`
  to {
    left: 100%;
  }
`;

const SkeletonBlock = styled.div`
    background-color: #7e7e7e;
    border-radius: 5px;
    height: ${(props) => props.$height || "20px"};
    width: ${(props) => props.$width || "100%"};
    align-self: ${(props) => props.$align || "center"};
    position: relative;
    overflow: hidden;

    &::after {
        content: "";
        position: absolute;
        top: 0;
        left: -100%;
        width: 100%;
        height: 100%;
        background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.6),
            transparent
        );
        animation: ${shimmer} 1s infinite;
    }
`;
