import AppLauncher from "launchers/app";
import CmdLauncher from "launchers/cmd";
import StatusBar from "status-bar/index";

export default App.config({
  icons: `${App.configDir}/assets`,
  windows: [StatusBar(), AppLauncher, CmdLauncher],
});
