import type { Application } from "resource:///com/github/Aylur/ags/service/applications.js";

const { query } = await Service.import("applications");

const WINDOW_NAME = "app-launcher";

function Item(app: Application) {
	return Widget.Button({
		on_clicked: () => {
			App.closeWindow(WINDOW_NAME);
			app.launch();
		},
		attribute: { app },
		child: Widget.Box({
			children: [
				Widget.Icon({ icon: app.icon_name || "", size: 42 }),
				Widget.Label({
					class_name: "title",
					label: app.name,
					xalign: 0,
					vpack: "center",
					truncate: "end",
				}),
			],
		}),
	});
}

const getItems = () => query("").map(Item);

function AppList() {
	const spacing = 12;
	let apps = getItems();

	const list = Widget.Box({ vertical: true, children: apps, spacing });

	const entry = Widget.Entry({
		hexpand: true,
		css: `margin-bottom: ${spacing}px;`,
		onAccept: () => {
			if (apps[0]) {
				App.toggleWindow(WINDOW_NAME);
				apps[0].attribute.app.launch();
			}
		},
		onChange: ({ text }) => {
			apps.map((item) => {
				item.visible = item.attribute.app.match(text ?? "");
			});
		},
	});

	return Widget.Box({
		vertical: true,
		css: `margin: ${spacing * 2}px;`,
		children: [
			entry,
			Widget.Scrollable({
				hscroll: "never",
				css: "min-width: 500px; min-height: 500px;",
				child: list,
			}),
		],
		setup: (self) => {
			self.hook(App, (_, windowName, visible) => {
				if (windowName !== WINDOW_NAME) return;

				if (visible) {
					apps = getItems();
					list.children = apps;
					entry.text = "";
					entry.grab_focus();
				}
			});
		},
	});
}

export default Widget.Window({
	name: WINDOW_NAME,
	setup: (self) => {
		self.keybind("Escape", () => {
			App.closeWindow(self.name ?? WINDOW_NAME);
		});
	},
	visible: false,
	keymode: "exclusive",
	child: AppList(),
});
