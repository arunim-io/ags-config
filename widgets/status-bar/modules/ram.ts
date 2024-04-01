const ram = Variable(0, {
  poll: [
    2000,
    "free",
    (out) => {
      const stats = out
        .split("\n")
        .find((line) => line.includes("Mem:"))
        ?.split(/\s+/)
        .splice(1, 2)
        .map(Number);

      return stats ? stats[1] / stats[0] : 0;
    },
  ],
});

export default Widget.Box({
  children: [
    Widget.Label({
      label: ram.bind().as((v: number) => `${Math.round(v * 100)}%`),
    }),
    Widget.Icon({ icon: "ram-symbolic" }),
  ],
});
