import AppLauncher from "app-launcher/index";
import StatusBar from "status-bar/index";

export default App.config({
  icons: `${App.configDir}/assets`,
  windows: [StatusBar(), AppLauncher],
});
