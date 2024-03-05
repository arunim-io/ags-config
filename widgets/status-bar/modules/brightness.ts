import brightness from "services/brightness.js";

const value = brightness.bind("screen_value");

export default Widget.Box({
	children: [
		Widget.Label({ label: value.as((value) => `${value * 100}%`) }),
		Widget.Icon({
			icon: value.as((value) => {
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
			}),
		}),
	],
});
