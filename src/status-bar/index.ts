import Audio from "resource:///com/github/Aylur/ags/service/audio.js";
import Battery from "resource:///com/github/Aylur/ags/service/battery.js";
import Hyprland from "resource:///com/github/Aylur/ags/service/hyprland.js";
import SystemTray from "resource:///com/github/Aylur/ags/service/systemtray.js";
import Brightness from "./services/brightness";

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

			if (!stats) return 0;
			return Math.round((stats[1] / stats[0]) * 100);
		},
	],
});

const ram_indicator = Widget.Box({
	children: [
		Widget.Label({ label: ram.bind().as((value) => `${value}%`) }),
		Widget.Icon({ icon: "ram-symbolic" }),
	],
});

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

			return Math.round(Number(stat));
		},
	],
});

const cpu_indicator = Widget.Box({
	children: [
		Widget.Label({ label: cpu.bind().as((value) => `${value}%`) }),
		Widget.Icon({ icon: "cpu-symbolic" }),
	],
});

function brightness_indicator() {
	const icon_types = {
		67: "high",
		34: "medium",
		1: "low",
		0: "",
	};

	function getIcon() {
		const icon = [67, 34, 1, 0].find(
			(threshold) => threshold <= Brightness.percent,
		);
		return `display-brightness${icon && `-${icon_types[icon]}`}-symbolic`;
	}

	return Widget.Button({
		onScrollUp: () => {
			Brightness.value += 0.1;
		},
		onScrollDown: () => {
			Brightness.value -= 0.1;
		},
		child: Widget.Box({
			children: [
				Widget.Icon({ icon: Utils.watch(getIcon(), Brightness, getIcon) }),
				Widget.Label({
					label: Brightness.bind("percent").as((value) => `${value}%`),
				}),
			],
		}),
	});
}

function microphone_indicator() {
	const icon_types = {
		67: "high",
		34: "medium",
		1: "low",
		0: "muted",
	};

	function getIcon() {
		const icon = Audio.microphone.is_muted
			? 0
			: [67, 34, 1, 0].find(
					(threshold) => threshold <= Audio.microphone.volume * 100,
				) || 0;

		return `audio-input-microphone-${icon_types[icon]}-symbolic`;
	}

	return Widget.Button({
		onScrollUp: () => {
			Audio.microphone.volume += 0.05;
		},
		onScrollDown: () => {
			Audio.microphone.volume -= 0.05;
		},
		child: Widget.Box({
			children: [
				Widget.Icon({
					icon: Utils.watch(getIcon(), Audio.microphone, getIcon),
				}),
				Widget.Label({
					label: Utils.merge(
						[
							Audio.microphone.bind("volume"),
							Audio.microphone.bind("is_muted"),
						],
						(volume, is_muted) =>
							is_muted ? "MUTED" : `${Math.round(volume * 100)}%`,
					),
				}),
			],
		}),
	});
}
function speaker_indicator() {
	const icon_types = {
		101: "overamplified",
		67: "high",
		34: "medium",
		1: "low",
		0: "muted",
	};

	function getIcon() {
		const icon = Audio.speaker.is_muted
			? 0
			: [101, 67, 34, 1, 0].find(
					(threshold) => threshold <= Audio.speaker.volume * 100,
				) || 0;

		return `audio-volume-${icon_types[icon]}-symbolic`;
	}

	return Widget.Button({
		onScrollUp: () => {
			Audio.speaker.volume += 0.05;
		},
		onScrollDown: () => {
			Audio.speaker.volume -= 0.05;
		},
		child: Widget.Box({
			children: [
				Widget.Icon({
					icon: Utils.watch(getIcon(), Audio.speaker, getIcon),
				}),
				Widget.Label({
					label: Utils.merge(
						[Audio.speaker.bind("volume"), Audio.speaker.bind("is_muted")],
						(volume, is_muted) =>
							is_muted ? "MUTED" : `${Math.round(volume * 100)}%`,
					),
				}),
			],
		}),
	});
}

const clock = Widget.Label({
	hpack: "center",
	label: Variable("", { poll: [1000, 'date "+%a %d %b %X"'] }).bind(),
});

const battery_indicator = Widget.Box({
	visible: Battery.bind("available"),
	children: [
		Widget.Icon({ icon: Battery.bind("icon_name") }),
		Widget.Label({
			label: Battery.bind("percent").as((p) => `${p}%`),
		}),
	],
});

const SysTray = Widget.Box({
	children: SystemTray.bind("items").as((items) =>
		items.map((item) =>
			Widget.Button({
				child: Widget.Icon({ icon: item.bind("icon") }),
				onPrimaryClick: (_, event) => item.activate(event),
				onSecondaryClick: (_, event) => item.openMenu(event),
				tooltipMarkup: item.bind("tooltip_markup"),
			}),
		),
	),
});

const CurrentWindowTitle = Widget.Label({
	truncate: "end",
	visible: Hyprland.active.client.bind("address").as((address) => !!address),
	label: Hyprland.active.client.bind("title"),
});

function WorkspaceList() {
	function dispatch(number: string | number) {
		Hyprland.messageAsync(`dispatch workspace ${number}`);
	}

	return Widget.EventBox({
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

			setup: (self) =>
				self.hook(Hyprland, () =>
					self.children.map((btn) => {
						btn.visible = Hyprland.workspaces.some(
							(ws) => ws.id === btn.attribute,
						);
					}),
				),
		}),
	});
}

export default function StatusBar(monitor = 0) {
	return Widget.Window({
		monitor,
		name: `status-bar-${monitor}`,
		anchor: ["top", "left", "right"],
		exclusivity: "exclusive",
		child: Widget.CenterBox({
			marginLeft: 10,
			marginRight: 10,
			marginStart: 5,
			marginEnd: 5,
			start_widget: Widget.Box({
				hpack: "start",
				spacing: 10,
				children: [WorkspaceList(), CurrentWindowTitle],
			}),
			end_widget: Widget.Box({
				hpack: "end",
				spacing: 10,
				children: [
					SysTray,
					microphone_indicator(),
					speaker_indicator(),
					cpu_indicator,
					ram_indicator,
					brightness_indicator(),
					clock,
					battery_indicator,
				],
			}),
		}),
	});
}
