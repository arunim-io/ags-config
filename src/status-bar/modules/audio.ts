import { toPercentage } from "utils";

const audio = await Service.import("audio");

const Input = Widget.Box().hook(
  audio,
  (self) => {
    const is_muted = audio.microphone.stream?.is_muted;

    self.children = [
      Widget.Label({ label: is_muted ? "OFF" : "ON" }),
      Widget.Icon({
        icon: `audio-input-microphone${is_muted ? "-muted" : ""}-symbolic`,
      }),
    ];
  },
  "microphone-changed",
);

const Output = Widget.Button({
  onScrollUp: () => {
    audio.speaker.volume += 0.05;
  },
  onScrollDown: () => {
    audio.speaker.volume -= 0.05;
  },
}).hook(
  audio,
  (self) => {
    const is_muted = audio.speaker.stream?.is_muted;

    self.child = Widget.Box({
      children: [
        Widget.Label({
          label: is_muted
            ? "MUTED"
            : audio.speaker.bind("volume").as(toPercentage),
        }),
        Widget.Icon({
          icon: audio.speaker.bind("volume").as((value) => {
            const volume = value * 100;
            const icon = [
              [101, "overamplified"],
              [67, "high"],
              [34, "medium"],
              [1, "low"],
              [0, "muted"],
            ].find(([threshold]) => Number(threshold) <= volume)?.[1];

            return `audio-volume-${is_muted ? "muted" : icon}-symbolic`;
          }),
        }),
      ],
    });
  },
  "speaker-changed",
);

export default Widget.Box({
  spacing: 5,
  children: [Input, Output],
});
