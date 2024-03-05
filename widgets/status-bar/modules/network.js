const network = await Service.import("network");

export default Widget.Stack({
	shown: network.bind("primary").as((primary) => primary || "wifi"),
	children: {
		wired: Widget.Box({
			children: [
				Widget.Label({ label: "Ethernet" }),
				Widget.Icon({ icon: network.wired.bind("icon_name") }),
			],
		}),
		wifi: Widget.Box({
			children: [
				Widget.Label({
					label: network.wifi.bind("ssid").as((ssid) => ssid || "unknown"),
				}),
				Widget.Icon({ icon: network.wifi.bind("icon_name") }),
			],
		}),
	},
});
