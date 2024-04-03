const WINDOW_NAME = "cmd-launcher";

function Box() {
  const spacing = 10;
  let cmd: string | null = null;

  return Widget.Box({
    spacing,
    css: `margin: ${spacing * 2}px;`,
    vertical: true,
    children: [
      Widget.Label({ label: "Type your command" }),
      Widget.Entry({
        hexpand: true,
        onChange: ({ text }) => {
          cmd = text;
        },
        onAccept: async () => {
          if (cmd !== null) {
            App.toggleWindow(WINDOW_NAME);
            await Utils.execAsync(cmd);
          }
        },
      }),
    ],
  });
}

export default Widget.Window({
  name: WINDOW_NAME,
  visible: false,
  keymode: "exclusive",
  setup: (self) =>
    self.keybind("Escape", () => App.closeWindow(self.name ?? WINDOW_NAME)),
  child: Box(),
});
