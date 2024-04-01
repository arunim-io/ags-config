const cpu = Variable(0, {
  poll: [
    2000,
    "top -b -n 1",
    (out) => {
      const stat = out
        .split("\n")
        .find((line) => line.includes("Cpu(s)"))
        ?.split(/\s+/)[1]
        .replace(",", ".");

      return stat ? Number(stat) / 100 : 0;
    },
  ],
});

export default Widget.Box({
  children: [
    Widget.Label({
      label: cpu.bind().as((v: number) => `${Math.round(v * 100)}%`),
    }),
    Widget.Icon({ icon: "cpu-symbolic" }),
  ],
});
