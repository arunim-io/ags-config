class BrightnessService extends Service {
  static {
    Service.register(
      BrightnessService,
      {
        "screen-changed": ["float"],
      },
      {
        "screen-value": ["float", "rw"],
      },
    );
  }

  #interface = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'");

  #screenValue = 0;
  #max = Number(Utils.exec("brightnessctl max"));

  get screen_value() {
    return this.#screenValue;
  }

  set screen_value(percent) {
    let value = percent;

    if (percent < 0) value = 0;
    if (percent > 1) value = 1;

    Utils.execAsync(`brightnessctl set ${value * 100}% -q`);
  }

  constructor() {
    super();

    const brightness = `/sys/class/backlight/${this.#interface}/brightness`;
    Utils.monitorFile(brightness, () => this.#onChange());

    this.#onChange();
  }

  #onChange() {
    this.#screenValue = Number(Utils.exec("brightnessctl get")) / this.#max;

    this.emit("changed");
    this.notify("screen-value");

    this.emit("screen-changed", this.#screenValue);
  }

  // biome-ignore lint/style/useDefaultParameterLast: It is out of my hand.
  connect(event = "screen-changed", callback) {
    return super.connect(event, callback);
  }
}

const service = new BrightnessService();

export default service;
