const systemtray = await Service.import("systemtray");

/** @param {import('types/service/systemtray').TrayItem} item */
function TrayItem(item) {
	return Widget.Button({
		child: Widget.Icon().bind("icon", item, "icon"),
		tooltipMarkup: item.bind("tooltip_markup"),
		onPrimaryClick: (_, event) => item.openMenu(event),
	});
}

export default Widget.Box({
	children: systemtray.bind("items").as((i) => i.map(TrayItem)),
});
