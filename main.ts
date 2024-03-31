import AppLauncher from "widgets/app-launcher/index.js";
import StatusBar from "widgets/status-bar/index.js";

export default App.config({
	icons: `${App.configDir}/assets`,
	windows: [StatusBar(), AppLauncher],
});
