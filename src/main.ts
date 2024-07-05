const time = Variable("", {
  poll: [1000, () => Date().toString()],
});

function Bar(monitor: number) {
  return Widget.Window({
    monitor,
    name: `bar${monitor}`,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    child: Widget.CenterBox({
      start_widget: Widget.Label({
        hpack: "center",
        label: "Welcome to AGS!",
      }),
      end_widget: Widget.Label({
        hpack: "center",
        label: time.bind(),
      }),
    }),
  });
}

App.config({
  windows: [Bar(0)],
});
