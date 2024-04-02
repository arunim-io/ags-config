const audio = await Service.import("audio");

export default Widget.Box({
	spacing: 5,
	children: [
		Widget.Box({
			children: [
				Widget.Label().hook(
					audio,
					(self) => {
						self.label = audio.microphone.stream?.is_muted ? "OFF" : "ON";
					},
					"microphone-changed",
				),
				Widget.Icon().hook(
					audio,
					(self) => {
						self.icon = `audio-input-microphone${
							audio.microphone.stream?.is_muted ? "-muted" : ""
						}-symbolic`;
					},
					"microphone-changed",
				),
			],
		}),
		Widget.Box({
			children: [
				Widget.Label({
					label: audio.speaker
						.bind("volume")
						.as((volume) => `${Math.round(volume * 100)}%`),
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

						return `audio-volume-${icon}-symbolic`;
					}),
				}),
			],
		}),
	],
});
