const time = Variable("", {
	poll: [1000, () => Date().toString()],
});

export default function StatusBar(monitor: number) {
	return Widget.Window({
		monitor,
		name: `bar${monitor}`,
		anchor: ["top", "left", "right"],
		exclusivity: "exclusive",
		child: Widget.CenterBox({
			start_widget: Widget.Label({
				hpack: "center",
				label: "Hewllo",
			}),
			end_widget: Widget.Label({
				hpack: "center",
				label: time.bind(),
			}),
		}),
	});
}
