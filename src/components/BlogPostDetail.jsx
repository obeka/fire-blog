import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  CircularProgress,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Box,
  Divider,
  Stack,
  Tooltip,
} from "@mui/material";
import { BlogFavAndComment } from "./BlogFavAndComment";
import { deleteSinglePost, getSingleBlog } from "../helper/operations";
import { LoadingButton } from "@mui/lab";
import { AuthContext } from "../context/AuthProvider";

export const BlogPostDetail = () => {
  const params = useParams();
  const user = useContext(AuthContext);
  const [blogData, setBlogData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [alertContent, setAlertContent] = useState({});

  const navigate = useNavigate();

  const handleClickUpdate = () => {
    navigate("/edit", {
      state: {
        title: blogData.title,
        imageURL: blogData.imageURL,
        content: blogData.content,
        id: params.id,
      },
    });
  };

  const handleClickDelete = async () => {
    setIsLoading(true);
    try {
      await deleteSinglePost(params.id);
      navigate("/");
    } catch (e) {
      console.log("There is an error while deleteing the blog post.", e);
      setAlertContent({ content: e });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    const getBlogPost = async () => {
      setIsLoading(true);
      try {
        const docSnap = await getSingleBlog(params.id);
        if (docSnap.exists()) {
          setBlogData(docSnap.data());
        } else {
          setBlogData({});
        }
      } catch (error) {
        console.log("There is an error while fetching the blog post.", error);
        setAlertContent({ content: error });
      }
      setIsLoading(false);
    };

    getBlogPost();
  }, []);

  if (alertContent?.content) {
    return (
      <Typography sx={{ mt: 10 }}>
        There is an error while getting the blog post.
      </Typography>
    );
  }

  return (
    <>
      {isLoading ? (
        <CircularProgress sx={{ mt: 3 }} />
      ) : Object.values(blogData).length === 0 ? (
        <Typography sx={{ mt: 10 }}>
          There is no data about this blog post.
        </Typography>
      ) : (
        <Card sx={{ maxWidth: "50%", margin: "50px auto 0", boxShadow: 5 }}>
          <CardMedia
            component="img"
            height="140"
            image={blogData.imageURL}
            alt={blogData.title}
            sx={{ objectFit: "contain" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {blogData.title}
            </Typography>
            <Divider />
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="body2" component="div">
                Created by : {blogData.created_by}
              </Typography>

              <Typography
                gutterBottom
                component="div"
                sx={{ fontFamily: "monospace" }}
              >
                {new Date(blogData.created_at.toDate()).toLocaleString()}
              </Typography>
            </Stack>
            {blogData.updated_by && (
              <>
                <Divider />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography gutterBottom variant="body2" component="div">
                    Updated by : {blogData.updated_by}
                  </Typography>

                  <Typography
                    gutterBottom
                    component="div"
                    sx={{ fontFamily: "monospace" }}
                  >
                    {new Date(blogData.updated_at.toDate()).toLocaleString()}
                  </Typography>
                </Stack>
              </>
            )}
            <Divider />
            <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
              <Typography variant="p" color="text.secondary">
                {blogData.content}
              </Typography>
            </Box>
          </CardContent>
          <BlogFavAndComment blog={blogData} />
          <CardActions sx={{ justifyContent: "flex-end" }}>
            <Button
              size="small"
              variant="contained"
              onClick={handleClickUpdate}
              disabled={!user?.currentUser}
            >
              Update
            </Button>
            <LoadingButton
              size="small"
              variant="contained"
              onClick={handleClickDelete}
              loading={isLoading}
              disabled={!user?.currentUser}
            >
              Delete
            </LoadingButton>
          </CardActions>
        </Card>
      )}
    </>
  );
};
