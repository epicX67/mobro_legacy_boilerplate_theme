// OnChange callbacks
function onCPU_Usage() {}
function onCPU_Temp() {}
function onCPU_Fan() {}
function onGPU_Temp() {}
function onGPU_Usage() {}
function onGPU_Fan() {}
function onMemory_Usage() {}
function onMemory_Used() {}
function onVRam_Usage() {}
function onVRam_Used() {}

// References
const Hardware = {
  CPU: {
    name: {
      value: "CPU",
      ref: document.getElementById("cpu_name"),
    },
    temperature: {
      unit: {
        value: "",
        ref: document.getElementById("cpu_temp_unit"),
      },
      min: {
        value: 0,
        ref: document.getElementById("cpu_temp_min"),
      },
      current: {
        value: 0,
        ref: document.getElementById("cpu_temp_curr"),
      },
      max: {
        value: 0,
        ref: document.getElementById("cpu_temp_max"),
      },
    },
    usage: {
      unit: {
        value: "",
        ref: document.getElementById("cpu_usage_unit"),
      },
      min: {
        value: 0,
        ref: document.getElementById("cpu_usage_min"),
      },
      current: {
        value: 0,
        ref: document.getElementById("cpu_usage_curr"),
      },
      max: {
        value: 0,
        ref: document.getElementById("cpu_usage_max"),
      },
    },
    fan: {
      unit: {
        value: "",
        ref: document.getElementById("cpu_fan_unit"),
      },
      min: {
        value: 0,
        ref: document.getElementById("cpu_fan_min"),
      },
      current: {
        value: 0,
        ref: document.getElementById("cpu_fan_curr"),
      },
      max: {
        value: 0,
        ref: document.getElementById("cpu_fan_max"),
      },
    },
  },
  GPU: {
    name: {
      value: "GPU",
      ref: document.getElementById("gpu_name"),
    },
    temperature: {
      unit: {
        value: "",
        ref: document.getElementById("gpu_temp_unit"),
      },
      min: {
        value: 0,
        ref: document.getElementById("gpu_temp_min"),
      },
      current: {
        value: 0,
        ref: document.getElementById("gpu_temp_curr"),
      },
      max: {
        value: 0,
        ref: document.getElementById("gpu_temp_max"),
      },
    },
    usage: {
      unit: {
        value: "",
        ref: document.getElementById("gpu_usage_unit"),
      },
      min: {
        value: 0,
        ref: document.getElementById("gpu_usage_min"),
      },
      current: {
        value: 0,
        ref: document.getElementById("gpu_usage_curr"),
      },
      max: {
        value: 0,
        ref: document.getElementById("gpu_usage_max"),
      },
    },
    fan: {
      unit: {
        value: "",
        ref: document.getElementById("gpu_fan_unit"),
      },
      min: {
        value: 0,
        ref: document.getElementById("gpu_fan_min"),
      },
      current: {
        value: 0,
        ref: document.getElementById("gpu_fan_curr"),
      },
      max: {
        value: 0,
        ref: document.getElementById("gpu_fan_max"),
      },
    },
    vram: {
      usage: {
        unit: {
          value: "",
          ref: document.getElementById("vram_usage_unit"),
        },
        min: {
          value: 0,
          ref: document.getElementById("vram_usage_min"),
        },
        current: {
          value: 0,
          ref: document.getElementById("vram_usage_curr"),
        },
        max: {
          value: 0,
          ref: document.getElementById("vram_usage_max"),
        },
      },
      used: {
        unit: {
          value: "",
          ref: document.getElementById("vram_used_unit"),
        },
        min: {
          value: 0,
          ref: document.getElementById("vram_used_min"),
        },
        current: {
          value: 0,
          ref: document.getElementById("vram_used_curr"),
        },
        max: {
          value: 0,
          ref: document.getElementById("vram_used_max"),
        },
      },
    },
  },
  Memory: {
    name: {
      value: "Memory",
      ref: document.getElementById("mem_name"),
    },
    usage: {
      unit: {
        value: "",
        ref: document.getElementById("mem_usage_unit"),
      },
      min: {
        value: 0,
        ref: document.getElementById("mem_usage_min"),
      },
      current: {
        value: 0,
        ref: document.getElementById("mem_usage_curr"),
      },
      max: {
        value: 0,
        ref: document.getElementById("mem_usage_max"),
      },
    },
    used: {
      unit: {
        value: "",
        ref: document.getElementById("mem_used_unit"),
      },
      min: {
        value: 0,
        ref: document.getElementById("mem_used_min"),
      },
      current: {
        value: 0,
        ref: document.getElementById("mem_used_curr"),
      },
      max: {
        value: 0,
        ref: document.getElementById("mem_used_max"),
      },
    },
  },
  update: (el, value) => {
    if (el.ref) {
      el.ref.innerText = value;
      el.value = value;
    }
  },
  set: (el, refVal, valueVal) => {
    if (el.ref) {
      el.ref.innerText = refVal;
      el.value = valueVal;
    }
  },
  get: (el) => {
    return el.value ? el.value : null;
  },
};

// SDK Stuff
MobroSDK.init().then(() => {
  MobroSDK.addChannelListener("general_processor_temperature", (data) => {
    if (data.payload) {
      const { sensortype, unit, value, min, max, _hardware } = data.payload;

      if (
        sensortype === "Temperature" &&
        _hardware.hardwaretype === "Processor"
      ) {
        Hardware.update(Hardware.CPU.temperature.unit, unit);
        Hardware.set(Hardware.CPU.temperature.min, min + unit, min);
        Hardware.set(Hardware.CPU.temperature.current, value + unit, value);
        Hardware.set(Hardware.CPU.temperature.max, max + unit, max);
        Hardware.update(Hardware.CPU.name, _hardware.title);
        onCPU_Temp();
      }
    }
  });
  MobroSDK.addChannelListener("general_processor_usage", (data) => {
    if (data.payload) {
      const { sensortype, unit, value, min, max, _hardware } = data.payload;

      if (sensortype === "Usage" && _hardware.hardwaretype === "Processor") {
        Hardware.update(Hardware.CPU.usage.unit, unit);
        Hardware.set(
          Hardware.CPU.usage.min,
          Math.round(min) + unit,
          Math.round(min)
        );
        Hardware.set(
          Hardware.CPU.usage.current,
          Math.round(value) + unit,
          Math.round(value)
        );
        Hardware.set(
          Hardware.CPU.usage.max,
          Math.round(max) + unit,
          Math.round(max)
        );
        onCPU_Usage();
      }
    }
  });
  MobroSDK.addChannelListener("general_graphics_temperature", (data) => {
    if (data.payload) {
      const { sensortype, unit, value, min, max, _hardware } = data.payload;

      if (
        sensortype === "Temperature" &&
        _hardware.hardwaretype === "Graphics"
      ) {
        Hardware.update(Hardware.GPU.temperature.unit, unit);
        Hardware.set(Hardware.GPU.temperature.min, min + unit, min);
        Hardware.set(Hardware.GPU.temperature.current, value + unit, value);
        Hardware.set(Hardware.GPU.temperature.max, max + unit, max);
        Hardware.update(Hardware.GPU.name, _hardware.title);
        onGPU_Temp();
      }
    }
  });
  MobroSDK.addChannelListener("general_graphics_usage", (data) => {
    if (data.payload) {
      const { sensortype, unit, value, min, max, _hardware } = data.payload;

      if (sensortype === "Usage" && _hardware.hardwaretype === "Graphics") {
        Hardware.update(Hardware.GPU.usage.unit, unit);
        Hardware.set(
          Hardware.GPU.usage.min,
          Math.round(min) + unit,
          Math.round(min)
        );
        Hardware.set(
          Hardware.GPU.usage.current,
          Math.round(value) + unit,
          Math.round(value)
        );
        Hardware.set(
          Hardware.GPU.usage.max,
          Math.round(max) + unit,
          Math.round(max)
        );
        onGPU_Usage();
      }
    }
  });
  MobroSDK.addChannelListener("general_memory_usage", (data) => {
    if (data.payload) {
      const { sensortype, unit, value, min, max, _hardware } = data.payload;

      if (sensortype === "Usage" && _hardware.hardwaretype === "Memory") {
        Hardware.update(Hardware.Memory.usage.unit, unit);
        Hardware.set(
          Hardware.Memory.usage.min,
          Math.round(min) + unit,
          Math.round(min)
        );
        Hardware.set(
          Hardware.Memory.usage.current,
          Math.round(value) + unit,
          Math.round(value)
        );
        Hardware.set(
          Hardware.Memory.usage.max,
          Math.round(max) + unit,
          Math.round(max)
        );
        Hardware.update(Hardware.Memory.name, _hardware.title);
        onMemory_Usage();
      }
    }
  });
  MobroSDK.addChannelListener("general_memory_used", (data) => {
    if (data.payload) {
      const { sensortype, unit, value, min, max, _hardware } = data.payload;

      if (sensortype === "Data" && _hardware.hardwaretype === "Memory") {
        const nMin = min.toPrecision(3);
        const nCurr = value.toPrecision(3);
        const nMax = max.toPrecision(3);
        Hardware.update(Hardware.Memory.used.unit, unit);
        Hardware.set(Hardware.Memory.used.min, nMin + unit, nMin);
        Hardware.set(Hardware.Memory.used.current, nCurr + unit, nCurr);
        Hardware.set(Hardware.Memory.used.max, nMax + unit, nMax);
        Hardware.update(Hardware.Memory.name, _hardware.title);
        onMemory_Used();
      }
    }
  });

  MobroSDK.addChannelListener("theme_fan_speed_cpu", (data) => {
    if (data.payload) {
      const { unit, value, min, max } = data.payload;
      const nMin = min ? min : 0;
      const nCurr = value ? value : 0;
      const nMax = max ? max : 0;
      const nUnit = unit ? unit : "RPM";
      Hardware.update(Hardware.CPU.fan.unit, nUnit);
      Hardware.set(Hardware.CPU.fan.min, nMin + nUnit, nMin);
      Hardware.set(Hardware.CPU.fan.current, nCurr + nUnit, nCurr);
      Hardware.set(Hardware.CPU.fan.max, nMax + nUnit, nMax);
      onCPU_Fan();
    }
  });
  MobroSDK.addChannelListener("theme_fan_speed_gpu", (data) => {
    if (data.payload) {
      const { unit, value, min, max } = data.payload;
      const nMin = min ? min : 0;
      const nCurr = value ? value : 0;
      const nMax = max ? max : 0;
      const nUnit = unit ? unit : "RPM";
      Hardware.update(Hardware.GPU.fan.unit, nUnit);
      Hardware.set(Hardware.GPU.fan.min, nMin + nUnit, nMin);
      Hardware.set(Hardware.GPU.fan.current, nCurr + nUnit, nCurr);
      Hardware.set(Hardware.GPU.fan.max, nMax + nUnit, nMax);
      onGPU_Fan();
    }
  });
  MobroSDK.addChannelListener("theme_vram", (data) => {
    if (data.payload) {
      const { sensortype, unit, value, min, max, _hardware } = data.payload;

      if (sensortype === "Data" && _hardware.hardwaretype === "Graphics") {
        const nMin = Math.round(min);
        const nCurr = Math.round(value);
        const nMax = Math.round(max);

        Hardware.update(Hardware.GPU.vram.used.unit, unit);
        Hardware.set(Hardware.GPU.vram.used.min, nMin + unit, nMin);
        Hardware.set(Hardware.GPU.vram.used.current, nCurr + unit, nCurr);
        Hardware.set(Hardware.GPU.vram.used.max, nMax + unit, nMax);
        onVRam_Used();
      }
    }
  });
  MobroSDK.addChannelListener("theme_vram_percentage", (data) => {
    if (data.payload) {
      const { sensortype, unit, value, min, max, _hardware } = data.payload;

      if (sensortype === "Usage" && _hardware.hardwaretype === "Graphics") {
        Hardware.update(Hardware.GPU.vram.usage.unit, unit);
        Hardware.set(
          Hardware.GPU.vram.usage.min,
          Math.round(min) + unit,
          Math.round(min)
        );
        Hardware.set(
          Hardware.GPU.vram.usage.current,
          Math.round(value) + unit,
          Math.round(value)
        );
        Hardware.set(
          Hardware.GPU.vram.usage.max,
          Math.round(max) + unit,
          Math.round(max)
        );
        onVRam_Usage();
      }
    }
  });
});
