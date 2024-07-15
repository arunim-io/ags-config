class BrightnessService extends Service {
  static {
    Service.register(
      BrightnessService,
      {
        "value-changed": ["float"],
      },
      {
        value: ["float", "rw"],
        percent: ["int"],
      },
    );
  }

  #device = Utils.exec("sh -c 'ls -w1 /sys/class/backlight | head -1'");

  #currentValue = 0;
  #percent = 0;
  #maxValue = Number(Utils.exec("brightnessctl max"));

  get value() {
    return this.#currentValue;
  }

  set value(percent) {
    let value = percent;

    if (percent < 0) value = 0;
    if (percent > 1) value = 1;

    Utils.execAsync(`brightnessctl set ${value * 100}% -q`);
  }

  get percent() {
    return this.#percent;
  }

  constructor() {
    super();

    const brightness = `/sys/class/backlight/${this.#device}/brightness`;
    Utils.monitorFile(brightness, () => this.#onChange());

    this.#onChange();
  }

  #onChange() {
    const value = Number(Utils.exec("brightnessctl get")) / this.#maxValue;
    this.#currentValue = value;
    this.#percent = value * 100;

    this.changed("value");
    this.changed("percent");

    this.emit("value-changed", this.#currentValue);
  }

  // biome-ignore lint/style/useDefaultParameterLast: It is out of my hand.
  connect(event = "value-changed", callback) {
    return super.connect(event, callback);
  }
}

export default new BrightnessService();
