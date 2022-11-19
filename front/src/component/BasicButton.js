import { Card, CardContent, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";

export default function BasicButton(props) {
  const clickedButtonStyle = {
    textColor: "white",
    backgroundColor: "#64b5f6",
    margin: "0vh 5vh 5vh 5vh",
  };
  const buttonStyle = {
    textColor: "black",
    backgroundColor: "white",
    margin: "0vh 5vh 5vh 5vh",
  };
  const { content, isSelected, handleClick, elementIndex } = props;

  return (
    <Grid xs={6} sx={{ my: 5 }} style={{ textAlign: "center" }}>
      <Card
        style={isSelected ? clickedButtonStyle : buttonStyle}
        onClick={() => handleClick(elementIndex)}
      >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {elementIndex + 1} 번
          </Typography>
          <Typography variant="h6" color="text.secondary">
            {content}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
