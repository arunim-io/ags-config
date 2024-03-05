import StatusBar from "widgets/status-bar/index";

export default App.config({
  icons: `${App.configDir}/assets`,
  windows: [StatusBar()],
});
