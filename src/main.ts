import StatusBar from "./modules/status-bar/index";
import AppMenu from "./modules/app-menu/index";

App.config({
  windows: [StatusBar(), AppMenu()],
});
