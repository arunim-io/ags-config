import Audio from "./modules/audio.js";
import Battery from "./modules/battery.js";
import Bluetooth from "./modules/bluetooth.js";
import Brightness from "./modules/brightness.js";
import Clock from "./modules/clock.js";
import { WindowTitle, Workspaces } from "./modules/hyprland.js";
import Network from "./modules/network.js";
import Tray from "./modules/tray.js";

const cpu = Variable(0, {
	poll: [
		2000,
		"top -b -n 1",
		(out) => {
			const stat = out
				.split("\n")
				.find((line) => line.includes("Cpu(s)"))
				?.split(/\s+/)[1]
				.replace(",", ".");

			return stat ? Number(stat) / 100 : 0;
		},
	],
});

const ram = Variable(0, {
	poll: [
		2000,
		"free",
		(out) => {
			const stats = out
				.split("\n")
				.find((line) => line.includes("Mem:"))
				?.split(/\s+/)
				.splice(1, 2)
				.map(Number);

			return stats ? stats[1] / stats[0] : 0;
		},
	],
});

const value = (v: number) => `${Math.round(v * 100)}%`;

export default function StatusBar(monitor: number | undefined) {
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
					Widget.Label({ label: cpu.bind().as(value) }),
					Widget.Label({ label: ram.bind().as(value) }),
					Brightness,
					Clock,
					Battery,
				],
			}),
		}),
	});
}
