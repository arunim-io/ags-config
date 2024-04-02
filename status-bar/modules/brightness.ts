import { toPercentage } from "utils";
import brightness from "../services/brightness";

function getIcon(value: number) {
  if (value <= 0.25) {
    return "display-brightness-low-symbolic";
  }
  if (value >= 0.5 && value < 0.75) {
    return "display-brightness-medium-symbolic";
  }
  if (value >= 0.75) {
    return "display-brightness-high-symbolic";
  }
  return "display-brightness-symbolic";
}

export default Widget.Button({
  onScrollUp: () => {
    brightness.screen_value += 0.1;
  },
  onScrollDown: () => {
    brightness.screen_value -= 0.1;
  },
  child: Widget.Box({
    children: [
      Widget.Label({ label: brightness.bind("screen_value").as(toPercentage) }),
      Widget.Icon({ icon: brightness.bind("screen_value").as(getIcon) }),
    ],
  }),
});
