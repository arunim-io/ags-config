import Audio from "./modules/audio";
import Battery from "./modules/battery";
import Bluetooth from "./modules/bluetooth";
import Brightness from "./modules/brightness";
import Clock from "./modules/clock";
import Cpu from "./modules/cpu";
import { WindowTitle, Workspaces } from "./modules/hyprland";
import Network from "./modules/network";
import Ram from "./modules/ram";
import Tray from "./modules/tray";

export default function StatusBar(monitor?: number) {
  const spacing = 10;

  return Widget.Window({
    name: monitor ? `status-bar-${monitor}` : "status-bar",
    class_name: "bar",
    monitor,
    anchor: ["top", "left", "right"],
    exclusivity: "exclusive",
    margins: [5, 0],
    child: Widget.CenterBox({
      start_widget: Widget.Box({
        spacing,
        children: [Workspaces, WindowTitle],
      }),
      end_widget: Widget.Box({
        hpack: "end",
        spacing,
        children: [
          Tray,
          Audio,
          Bluetooth,
          Network,
          Cpu,
          Ram,
          Brightness,
          Clock,
          Battery,
        ],
      }),
    }),
  });
}
