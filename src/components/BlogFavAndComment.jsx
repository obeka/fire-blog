import { CardActions, IconButton } from "@mui/material";

import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import { red, purple } from "@mui/material/colors";

export const BlogFavAndComment = (props) => {
  const { blog } = props;
  return (
    <CardActions sx={{ justifyContent: "flex-end" }}>
      <IconButton size="small">
        <FavoriteIcon sx={{ pr: 0.5, color: red[800] }} />
        {blog.like}
      </IconButton>
      <IconButton size="small">
        <ModeCommentIcon sx={{ pr: 0.5, color: purple[200] }} />
        {blog.like}
      </IconButton>
    </CardActions>
  );
};
