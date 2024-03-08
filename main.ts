import AppLauncher from "widgets/app-launcher/index";
import StatusBar from "widgets/status-bar/index";

export default App.config({
  icons: `${App.configDir}/assets`,
  windows: [StatusBar(), AppLauncher],
});
