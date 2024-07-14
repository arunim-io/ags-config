import StatusBar from "./status-bar/index";
import AppMenu from "./app-menu/index";

App.config({
  windows: [StatusBar(0), AppMenu()],
});
