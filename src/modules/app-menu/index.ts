const { query } = await Service.import("applications");

const WINDOW_NAME = "app-launcher";

const closeApp = () => App.closeWindow(WINDOW_NAME);

const getApps = () =>
  query("").map((app) =>
    Widget.Button({
      on_clicked() {
        closeApp();
        app.launch();
      },
      attribute: app,
      child: Widget.Box({
        children: [
          Widget.Icon({
            icon: app.icon_name || "",
            size: 42,
          }),
          Widget.Label({
            class_name: "title",
            label: app.name,
            xalign: 0,
            vpack: "center",
            truncate: "end",
          }),
        ],
      }),
    }),
  );

function AppLauncher() {
  const spacing = 12;
  let apps = getApps();

  const list = Widget.Box({
    spacing,
    vertical: true,
    children: apps,
  });

  const searchBar = Widget.Entry({
    hexpand: true,
    css: `margin-top: ${spacing}px; margin-bottom: ${spacing}px;`,
    on_accept() {
      const result = apps.filter((item) => item.visible)[0];
      if (result) {
        App.toggleWindow(WINDOW_NAME);
        result.attribute.launch();
      }
    },
    on_change({ text }) {
      for (const item of apps) {
        item.visible = item.attribute.match(text ?? "");
      }
    },
  });

  return Widget.Window({
    name: WINDOW_NAME,
    visible: false,
    keymode: "exclusive",
    anchor: ["right", "top", "bottom"],
    child: Widget.Box({
      vertical: true,
      css: `margin: ${spacing * 2}px;`,
      children: [
        Widget.Label({
          label: "Applications",
          css: "font-size: 25px; font-weight: 600;",
        }),
        searchBar,
        Widget.Scrollable({
          hscroll: "never",
          css: "min-width: 500px; min-height: 500px;",
          child: list,
        }),
      ],
    })
      .keybind("Escape", closeApp)
      .hook(App, (_, windowName: string, visible: boolean) => {
        if (windowName !== WINDOW_NAME && visible) {
          apps = getApps();
          list.children = apps;
          searchBar.text = "";
          searchBar.grab_focus();
        }
      }),
  });
}

export default AppLauncher;
