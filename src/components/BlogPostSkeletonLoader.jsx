import styled, { keyframes } from "styled-components";
import NavigationBar from "./NavigationBar";

export default function BlogPostSkeletonLoader() {
    return (
        <>
            <NavigationBar />
            <Container>
                <TitleZone>
                    <SkeletonBlock
                        $width="500px"
                        $height="50px"
                        $margin="1.4rem 0"
                    />
                </TitleZone>
                <TextZone>
                    <SkeletonBlock
                        $width="150px"
                        $height="30px"
                        $margin="0"
                        $align="flex-start"
                        $top="-70px"
                    />
                    <SkeletonBlock $width="100%" $height="600px" />
                </TextZone>
            </Container>
        </>
    );
}

const shimmer = keyframes`
  to {
    left: 100%;
  }
`;

const SkeletonBlock = styled.div`
    width: ${(props) => props.$width || "100%"};
    height: ${(props) => props.$height || "20px"};
    margin: ${(props) => props.$margin || "0"};
    align-self: ${(props) => props.$align || "center"};
    top: ${(props) => props.$top || "0"};
    background-color: #7e7e7e;
    border-radius: 5px;
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

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: center;
    align-items: center;
`;

const TitleZone = styled.div`
    border-radius: 5px;
    width: 100%;
    background-color: #3d3d3d;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem 0;
`;

const TextZone = styled.div`
    padding: 1rem;
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;
