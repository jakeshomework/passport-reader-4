// ===== MATERIAL-UI COLOR IMPORTS ===== //
import lightBlue from "material-ui/colors/lightBlue";
import lightGreen from "material-ui/colors/lightGreen";
import pink from "material-ui/colors/pink";
import purple from "material-ui/colors/purple";
import yellow from "material-ui/colors/yellow";
import grey from "material-ui/colors/grey";

export const colorLabels = {
  yellow: {
    label: "Main Concept",
    active: yellow["500"],
    inactive: yellow["500"]
  },
  green: {
    label: "Supporting Idea",
    active: lightGreen["A700"],
    inactive: lightGreen["A700"]
  },
  blue: {
    label: "Vocabulary",
    active: lightBlue["A100"],
    inactive: lightBlue["A100"]
  },
  pink: {
    label: "Character Detail",
    active: pink["A100"],
    inactive: pink["A100"]
  },
  purple: {
    label: "Question",
    active: purple["A100"],
    inactive: purple["A100"]
  }
};
