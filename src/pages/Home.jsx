import React, { useContext, useEffect, useState } from "react";
import { Typography, Box, Grid, CircularProgress } from "@mui/material";
import { AuthContext } from "../context/AuthProvider";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../helper/firebase";
import { useNavigate, Link } from "react-router-dom";
import { SingleBlogPost } from "../components/SingleBlogPost";
import { LoadingBlogCardSpinner } from "../components/LoadingBlogCardSpinner";

export const Home = () => {
  const { currentUser, isUserLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [allBlogs, setAllBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertContent, setAlertContent] = useState({});

  useEffect(() => {
    const unSubs = onSnapshot(
      query(collection(db, "blogs")),
      (querySnapshot) => {
        const allBlogsResponse = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setAllBlogs(allBlogsResponse);
        setIsLoading(false);
      },
      (error) => {
        console.log("There is an error while getting the posts.", error);
        setAlertContent({ content: error });
      }
    );

    return () => unSubs();
  }, []);

  if (alertContent?.content) {
    return (
      <Typography sx={{ mt: 10 }}>
        There is an error while getting the posts.
      </Typography>
    );
  }

  return (
    <>
      {isUserLoading ? (
        <CircularProgress sx={{ mt: 3 }} />
      ) : (
        <Typography variant="h4" sx={{ my: 4 }}>
          Welcome {currentUser ? currentUser.email : "Guest"} !
        </Typography>
      )}

      {isLoading ? (
        <LoadingBlogCardSpinner />
      ) : allBlogs.length === 0 ? (
        <Typography variant="h5">
          No blog post yet. Please{" "}
          <Typography
            variant="span"
            color="primary"
            onClick={() => navigate("/new")}
            sx={{ cursor: "pointer" }}
          >
            add one.
          </Typography>
        </Typography>
      ) : (
        <Grid container sx={{ width: "85%", margin: "auto" }}>
          {allBlogs.map((blog) => (
            <Grid item key={blog.id} xs={3}>
              <Link to={`/blog/${blog.id}`}>
                <SingleBlogPost blog={blog} />{" "}
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
};
