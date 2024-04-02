const bluetooth = await Service.import("bluetooth");

export default Widget.Box().hook(bluetooth, (self) => {
  const enabled = bluetooth.bind("enabled");

  self.children = [
    Widget.Label({
      label: enabled.as((on) => {
        if (on) {
          if (bluetooth.connected_devices.length > 0) {
            return bluetooth.connected_devices[0].name;
          }
          return "ON";
        }
        return "OFF";
      }),
    }),
    Widget.Icon({
      icon: enabled.as((on) => {
        if (on && bluetooth.connected_devices.length > 0) {
          return bluetooth.connected_devices[0].icon_name;
        }
        return `bluetooth-${on ? "active" : "disabled"}-symbolic`;
      }),
    }),
  ];
});
