import React, { useContext, useState } from "react";
import { TextField, Typography, Stack, Box } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { AuthContext } from "../context/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { Alert } from "../components/Alert";
import { createBlog, updateSingleBlog } from "../helper/operations";

export const CreateEditBlogPost = () => {
  const user = useContext(AuthContext);
  const { pathname, state: blogToBeEdited } = useLocation();
  const isEdit = pathname === "/edit";
  const navigate = useNavigate();
  const [blogData, setBlogData] = useState({
    title: blogToBeEdited?.title || "",
    imageURL: blogToBeEdited?.imageURL || "",
    content: blogToBeEdited?.content || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [alertContent, setAlertContent] = useState({});

  const handleChange = (value, inputType) => {
    setBlogData({ ...blogData, [inputType]: value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      isEdit
        ? await updateSingleBlog(blogToBeEdited.id, blogData, user)
        : await createBlog(blogData, user);

      setAlertContent({
        content: {
          message: `Blog was successfully ${isEdit ? "updated" : "created"}.`,
          severity: "success",
        },
      });
      isEdit ? navigate(-1) : navigate("/");
    } catch (e) {
      console.error(
        `Error ${isEdit ? "updating" : "adding"} the document: `,
        e
      );
      setAlertContent({ content: e });
    }
    setIsLoading(false);
  };

  return user.currentUser ? (
    <Box component="form" sx={{ mt: 10 }} onSubmit={onSubmit}>
      <Stack spacing={3} width="40%" margin="auto">
        <Typography variant="h5">{isEdit ? "Edit" : "New"} Blog</Typography>
        <TextField
          label="Title"
          required
          variant="outlined"
          onChange={(event) => handleChange(event.target.value, "title")}
          value={blogData.title}
        />
        <TextField
          label="Image URL"
          required
          variant="outlined"
          onChange={(event) => handleChange(event.target.value, "imageURL")}
          value={blogData.imageURL}
        />
        <TextField
          label="Content"
          multiline
          rows={12}
          required
          variant="outlined"
          value={blogData.content}
          onChange={(event) => handleChange(event.target.value, "content")}
        />
        <LoadingButton loading={isLoading} variant="contained" type="submit">
          {isEdit ? "Edit" : "Create"}
        </LoadingButton>
      </Stack>
      <Alert alertContent={alertContent} />
    </Box>
  ) : (
    <Typography mt={5}>
      In order to create a blog post you need to{" "}
      <Typography
        color="primary"
        variant="span"
        sx={{ cursor: "pointer" }}
        onClick={() => navigate("/auth")}
      >
        Log In
      </Typography>
      .
    </Typography>
  );
};
