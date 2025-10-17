import styled from "styled-components";
import { Link } from "react-router-dom";

export default function BlogCard({
    id,
    title,
    description,
    createdAt,
    updatedAt,
    published,
}) {
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

    return (
        <Link
            to={`/post/${id}`}
            style={{ textDecoration: "none", color: "inherit" }}
        >
            <Container>
                <p>{title}</p>
                <Description>{description}</Description>
                <Dates>
                    <p>Posted: {convertDate(createdAt)}</p>
                    {updatedAt && updatedAt !== createdAt && (
                        <p>Updated: {convertDate(updatedAt)}</p>
                    )}
                </Dates>
                {published ? (
                    <Status $published>Published</Status>
                ) : (
                    <Status>Unpublished</Status>
                )}
            </Container>
        </Link>
    );
}

const Container = styled.div`
    border: 1px solid white;
    border-radius: 5px;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
