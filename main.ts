import AppLauncher from "app-launcher";
import CmdLauncher from "cmd-launcher";
import StatusBar from "status-bar/index";

export default App.config({
  icons: `${App.configDir}/assets`,
  windows: [StatusBar(), AppLauncher, CmdLauncher],
});
