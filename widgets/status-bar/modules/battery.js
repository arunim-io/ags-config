const battery = await Service.import("battery");

const percent = battery.bind("percent");

export default Widget.Box({
	visible: battery.bind("available"),
	children: [
		Widget.Label({ label: percent.as((p) => `${p}%`) }),
		Widget.Icon({ icon: battery.bind("icon_name") }),
	],
});
