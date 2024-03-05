import StatusBar from "./widgets/status-bar/index.js";

/** @type {import('types/app.js').Config} */
export default {
	icons: `${App.configDir}/assets`,
	windows: [StatusBar()],
};
