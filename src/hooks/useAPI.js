const BLOG_API = import.meta.env.VITE_API_URL;

export default function useAPI() {
    const token = localStorage.getItem("jwtToken");

    const createPost = async (postData) => {
        try {
            const response = await fetch(`${BLOG_API}/posts`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) throw new Error("Failed to create post");

            return await response.json();
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    const deletePost = async (id) => {
        try {
            const response = await fetch(`${BLOG_API}/posts/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error("Failed to delete post");

            return await response.json();
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    const editPost = async (postData) => {
        try {
            const response = await fetch(`${BLOG_API}/posts/${postData.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(postData),
            });

            if (!response.ok) throw new Error("Failed to edit post");

            return await response.json();
        } catch (err) {
            console.error(err);
            return null;
        }
    };

    return { createPost, deletePost, editPost };
}
