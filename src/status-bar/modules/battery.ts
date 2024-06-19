const battery = await Service.import("battery");

export default Widget.Box({
  visible: battery.bind("available"),
  children: [
    Widget.Label({ label: battery.bind("percent").as((p) => `${p}%`) }),
    Widget.Icon({ icon: battery.bind("icon_name") }),
  ],
});
