const systemtray = await Service.import("systemtray");

export default Widget.Box({
  children: systemtray.bind("items").as((items) =>
    items.map((item) =>
      Widget.Button({
        child: Widget.Icon().bind("icon", item, "icon"),
        tooltipMarkup: item.bind("tooltip_markup"),
        onPrimaryClick: (_, event) => item.openMenu(event),
      }),
    ),
  ),
});
