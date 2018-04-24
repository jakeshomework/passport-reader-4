// ===== MATERIAL-UI COLOR IMPORTS ===== //
import lightBlue from "material-ui/colors/lightBlue";
import lightGreen from "material-ui/colors/lightGreen";
import pink from "material-ui/colors/pink";
import purple from "material-ui/colors/purple";
import yellow from "material-ui/colors/yellow";
import teal from "material-ui/colors/teal";

export const colorLabels = {
  hlc1: {
    label: "Main Concept",
    active: yellow["600"],
    inactive: yellow["600"]
  },
  hlc2: {
    label: "Supporting Idea",
    active: lightGreen["A700"],
    inactive: lightGreen["A700"]
  },
  hlc3: {
    label: "Vocabulary",
    active: lightBlue["A100"],
    inactive: lightBlue["A100"]
  },
  hlc4: {
    label: "Character Detail",
    active: pink["A100"],
    inactive: pink["A100"]
  },
  hlc5: {
    label: "Question",
    active: purple["A100"],
    inactive: purple["A100"]
  },
  audio: {
    active: teal["A400"]
  }
};
