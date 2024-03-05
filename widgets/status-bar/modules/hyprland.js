const hyprland = await Service.import("hyprland");

export const WindowTitle = Widget.Label({
  label: hyprland.active.client.bind("title"),
  visible: hyprland.active.client.bind("address").as((addr) => !!addr),
});

/** @param {string | number} no */
function dispatch(no) {
  hyprland.messageAsync(`dispatch workspace ${no}`);
}

export const Workspaces = Widget.EventBox({
  onScrollUp: () => dispatch("+1"),
  onScrollDown: () => dispatch("-1"),
  child: Widget.Box({
    children: Array.from({ length: 10 }, (_, index) => index + 1).map((no) =>
      Widget.Button({
        attribute: no,
        label: `${no}`,
        onClicked: () => dispatch(no),
      }),
    ),

    setup: (self) => {
      self.hook(hyprland, () => {
        for (const btn of self.children) {
          btn.visible = hyprland.workspaces.some(
            (ws) => ws.id === btn.attribute,
          );
        }
      });
    },
  }),
});
