import { useRef, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import NavigationBar from "./NavigationBar";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function PostEditor() {
    const [title, setTitle] = useState("");
    const [published, setPublished] = useState("on");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const editorRef = useRef(null);
    const API_KEY = import.meta.env.VITE_TINYMCE_API_KEY;
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const postData = {
            title,
            published,
            description,
            content,
        };

        try {
            const response = await fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("jwtToken")}`,
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) throw new Error("Failed to submit post");

            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Container>
                <NavigationBar mode="editor" />
                <PostInfoContainer>
                    <StyledInput
                        type="text"
                        name="title"
                        placeholder="Post title"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div>
                        <StyledLabel htmlFor="published">Publish?</StyledLabel>
                        <StyledInput
                            type="checkbox"
                            name="published"
                            $size="1rem"
                            onChange={(e) => setPublished(e.target.checked)}
                            checked={published}
                        />
                    </div>
                </PostInfoContainer>
                <DescriptionInput
                    type="text"
                    name="description"
                    placeholder="Short description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Editor
                    apiKey={API_KEY}
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue="<p>This is the initial content of the editor.</p>"
                    onEditorChange={(newContent) => setContent(newContent)}
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            "advlist",
                            "autolink",
                            "lists",
                            "link",
                            "image",
                            "charmap",
                            "preview",
                            "anchor",
                            "searchreplace",
                            "visualblocks",
                            "code",
                            "fullscreen",
                            "insertdatetime",
                            "media",
                            "table",
                            "code",
                            "help",
                            "wordcount",
                        ],
                        toolbar:
                            "undo redo | blocks | " +
                            "bold italic forecolor | alignleft aligncenter " +
                            "alignright alignjustify | bullist numlist outdent indent | " +
                            "removeformat | help",
                        content_style:
                            "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
                        telemetry: false,
                    }}
                />
                <SubmitBtn type="button" onClick={handleSubmit}>
                    Submit Post
                </SubmitBtn>
            </Container>
        </>
    );
}

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 2rem;
`;

const PostInfoContainer = styled.div`
    margin-top: 3rem;
    display: flex;
    gap: 2rem;
    justify-content: center;
    align-items: center;
`;

const StyledInput = styled.input`
    padding: 1rem;
    border-radius: 5px;
    font-size: 1.5rem;
    width: ${(props) => props.$size || "none"};
    height: ${(props) => props.$size || "none"};

    @media (max-width: 500px) {
        padding: 0.5rem;
        font-size: 1rem;
    }
`;

const StyledLabel = styled.label`
    font-size: 1.5rem;

    @media (max-width: 500px) {
        padding: 0.5rem;
        font-size: 0.8rem;
    }
`;

const DescriptionInput = styled.input`
    padding: 1rem;
    font-size: 1rem;
    border-radius: 5px;
    width: 40%;

    @media (max-width: 500px) {
        padding: 0.5rem;
        font-size: 0.8rem;
    }
`;

const SubmitBtn = styled.button`
    padding: 1rem 2rem;
    font-size: 1.5rem;
    background-color: #449b9b;
    color: black;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-weight: 900;

    &:hover {
        background-color: black;
        color: #449b9b;
    }

    @media (max-width: 500px) {
        padding: 0.5rem;
        font-size: 0.8rem;
    }
`;
