const network = await Service.import("network");

const menu = Widget.Menu({
  children: [
    Widget.MenuItem({
      child: Widget.Button({
        label: "Open settings",
      }),
    }),
  ],
});

export default Widget.Button({
  onSecondaryClick: (_, event) => menu.popup_at_pointer(event),
  child: Widget.Stack({
    shown: network.bind("primary").as((primary) => primary || "default"),
    children: {
      default: Widget.Label({ label: "No Internet" }),
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
  }),
});
