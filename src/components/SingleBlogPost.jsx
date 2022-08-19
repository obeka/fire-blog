import {
  Card,
  Stack,
  Divider,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Typograhy,
  IconButton,
} from "@mui/material";
import "../App.css";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { red, purple } from "@mui/material/colors";
import { BlogFavAndComment } from "./BlogFavAndComment";

export const SingleBlogPost = (props) => {
  const { blog } = props;

  return (
    <Card sx={{ maxWidth: 345, height: 500, py: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        height="140"
        image={blog.imageURL}
        alt="blog post "
        sx={{ objectFit: "contain" }}
      />
      <Divider sx={{ mt: 2 }} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blog.title}
        </Typography>
        <Divider sx={{ my: 1 }} />
        <Stack
          direction="row"
          justifyContent={"space-between"}
          alignItems="center"
        >
          <Typography component="div" variant="caption">
            {blog.created_by}
          </Typography>
          <Typography
            gutterBottom
            component="div"
            sx={{ fontFamily: "monospace" }}
          >
            {new Date(blog.created_at.toDate()).toLocaleString()}
          </Typography>
        </Stack>
        <Divider sx={{ mb: 0.5 }} />
        <Typography className="truncate">{blog.content}</Typography>
      </CardContent>

      <BlogFavAndComment blog={blog} />
    </Card>
  );
};
