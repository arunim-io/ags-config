const mpris = await Service.import("mpris");

export default Widget.Button().hook(mpris, (self) => {
  const { players } = mpris;
  const player = players[0];

  self.on_primary_click = () => player.playPause();
  self.visible = players.length > 0;
  self.child = Widget.Box({
    children: [
      Widget.Icon({
        icon: player.bind("entry").as((entry) => {
          const icon = `${entry}-symbolic`;
          if (Utils.lookUpIcon(icon)) return icon;
          return "audio-x-generic-symbolic";
        }),
      }),
      Widget.Label({
        label: player.bind("name").as((name) => {
          if (name === "firefox") return "Firefox";
          return player.track_title;
        }),
      }),
      Widget.Icon({
        icon: player.bind("play_back_status").as((status) => {
          let icon = "stop";
          if (status === "Playing") {
            icon = "start";
          }
          if (status === "Paused") {
            icon = "pause";
          }
          return `media-playback-${icon}-symbolic`;
        }),
      }),
    ],
  });
});
