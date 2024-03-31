const bluetooth = await Service.import("bluetooth");

export default Widget.Box().hook(bluetooth, (self) => {
	const enabled = bluetooth.bind("enabled");

	self.children = [
		Widget.Label({
			label: enabled.as((on) => (on ? "ON" : "OFF")),
		}),
		Widget.Icon({
			icon: enabled.as(
				(on) => `bluetooth-${on ? "active" : "disabled"}-symbolic`,
			),
		}),
	];
});
