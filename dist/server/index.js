import { EventEmitter } from "node:events";
const hrtime$6 = /* @__PURE__ */ Object.assign(function hrtime(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, { bigint: function bigint() {
  return BigInt(Date.now() * 1e6);
} });
let ReadStream$3 = class ReadStream {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};
let WriteStream$3 = class WriteStream {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};
// @__NO_SIDE_EFFECTS__
function createNotImplementedError$5(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented$5(name) {
  const fn = () => {
    throw /* @__PURE__ */ createNotImplementedError$5(name);
  };
  return Object.assign(fn, { __unenv__: true });
}
const NODE_VERSION$5 = "22.14.0";
let Process$3 = class Process extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream$3(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream$3(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream$3(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION$5}`;
  }
  get versions() {
    return { node: NODE_VERSION$5 };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError$5("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented$5("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented$5("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented$5("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented$5("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented$5("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented$5("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
const globalProcess$5 = globalThis["process"];
const getBuiltinModule$5 = globalProcess$5.getBuiltinModule;
const workerdProcess$5 = getBuiltinModule$5("node:process");
const unenvProcess$5 = new Process$3({
  env: globalProcess$5.env,
  hrtime: hrtime$6,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess$5.nextTick
});
const { exit: exit$5, features: features$5, platform: platform$5 } = workerdProcess$5;
const {
  _channel: _channel$5,
  _debugEnd: _debugEnd$5,
  _debugProcess: _debugProcess$5,
  _disconnect: _disconnect$5,
  _events: _events$5,
  _eventsCount: _eventsCount$5,
  _exiting: _exiting$5,
  _fatalException: _fatalException$5,
  _getActiveHandles: _getActiveHandles$5,
  _getActiveRequests: _getActiveRequests$5,
  _handleQueue: _handleQueue$5,
  _kill: _kill$5,
  _linkedBinding: _linkedBinding$5,
  _maxListeners: _maxListeners$5,
  _pendingMessage: _pendingMessage$5,
  _preload_modules: _preload_modules$5,
  _rawDebug: _rawDebug$5,
  _send: _send$5,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier$5,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier$5,
  _tickCallback: _tickCallback$5,
  abort: abort$5,
  addListener: addListener$5,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags$5,
  arch: arch$5,
  argv: argv$5,
  argv0: argv0$5,
  assert: assert$5,
  availableMemory: availableMemory$5,
  binding: binding$5,
  channel: channel$5,
  chdir: chdir$5,
  config: config$5,
  connected: connected$5,
  constrainedMemory: constrainedMemory$5,
  cpuUsage: cpuUsage$5,
  cwd: cwd$5,
  debugPort: debugPort$5,
  disconnect: disconnect$5,
  dlopen: dlopen$5,
  domain: domain$5,
  emit: emit$5,
  emitWarning: emitWarning$5,
  env: env$5,
  eventNames: eventNames$5,
  execArgv: execArgv$5,
  execPath: execPath$5,
  exitCode: exitCode$5,
  finalization: finalization$5,
  getActiveResourcesInfo: getActiveResourcesInfo$5,
  getegid: getegid$5,
  geteuid: geteuid$5,
  getgid: getgid$5,
  getgroups: getgroups$5,
  getMaxListeners: getMaxListeners$5,
  getuid: getuid$5,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback$5,
  hrtime: hrtime2,
  initgroups: initgroups$5,
  kill: kill$5,
  listenerCount: listenerCount$5,
  listeners: listeners$5,
  loadEnvFile: loadEnvFile$5,
  mainModule: mainModule$5,
  memoryUsage: memoryUsage$5,
  moduleLoadList: moduleLoadList$5,
  nextTick: nextTick$5,
  off: off$5,
  on: on$5,
  once: once$5,
  openStdin: openStdin$5,
  permission: permission$5,
  pid: pid$5,
  ppid: ppid$5,
  prependListener: prependListener$5,
  prependOnceListener: prependOnceListener$5,
  rawListeners: rawListeners$5,
  reallyExit: reallyExit$5,
  ref: ref$5,
  release: release$5,
  removeAllListeners: removeAllListeners$5,
  removeListener: removeListener$5,
  report: report$5,
  resourceUsage: resourceUsage$5,
  send: send$5,
  setegid: setegid$5,
  seteuid: seteuid$5,
  setgid: setgid$5,
  setgroups: setgroups$5,
  setMaxListeners: setMaxListeners$5,
  setSourceMapsEnabled: setSourceMapsEnabled$5,
  setuid: setuid$5,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback$5,
  sourceMapsEnabled: sourceMapsEnabled$5,
  stderr: stderr$5,
  stdin: stdin$5,
  stdout: stdout$5,
  throwDeprecation: throwDeprecation$5,
  title: title$5,
  traceDeprecation: traceDeprecation$5,
  umask: umask$5,
  unref: unref$5,
  uptime: uptime$5,
  version: version$5,
  versions: versions$5
} = unenvProcess$5;
const _process$5 = {
  abort: abort$5,
  addListener: addListener$5,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags$5,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback$5,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback$5,
  loadEnvFile: loadEnvFile$5,
  sourceMapsEnabled: sourceMapsEnabled$5,
  arch: arch$5,
  argv: argv$5,
  argv0: argv0$5,
  chdir: chdir$5,
  config: config$5,
  connected: connected$5,
  constrainedMemory: constrainedMemory$5,
  availableMemory: availableMemory$5,
  cpuUsage: cpuUsage$5,
  cwd: cwd$5,
  debugPort: debugPort$5,
  dlopen: dlopen$5,
  disconnect: disconnect$5,
  emit: emit$5,
  emitWarning: emitWarning$5,
  env: env$5,
  eventNames: eventNames$5,
  execArgv: execArgv$5,
  execPath: execPath$5,
  exit: exit$5,
  finalization: finalization$5,
  features: features$5,
  getBuiltinModule: getBuiltinModule$5,
  getActiveResourcesInfo: getActiveResourcesInfo$5,
  getMaxListeners: getMaxListeners$5,
  hrtime: hrtime2,
  kill: kill$5,
  listeners: listeners$5,
  listenerCount: listenerCount$5,
  memoryUsage: memoryUsage$5,
  nextTick: nextTick$5,
  on: on$5,
  off: off$5,
  once: once$5,
  pid: pid$5,
  platform: platform$5,
  ppid: ppid$5,
  prependListener: prependListener$5,
  prependOnceListener: prependOnceListener$5,
  rawListeners: rawListeners$5,
  release: release$5,
  removeAllListeners: removeAllListeners$5,
  removeListener: removeListener$5,
  report: report$5,
  resourceUsage: resourceUsage$5,
  setMaxListeners: setMaxListeners$5,
  setSourceMapsEnabled: setSourceMapsEnabled$5,
  stderr: stderr$5,
  stdin: stdin$5,
  stdout: stdout$5,
  title: title$5,
  throwDeprecation: throwDeprecation$5,
  traceDeprecation: traceDeprecation$5,
  umask: umask$5,
  uptime: uptime$5,
  version: version$5,
  versions: versions$5,
  // @ts-expect-error old API
  domain: domain$5,
  initgroups: initgroups$5,
  moduleLoadList: moduleLoadList$5,
  reallyExit: reallyExit$5,
  openStdin: openStdin$5,
  assert: assert$5,
  binding: binding$5,
  send: send$5,
  exitCode: exitCode$5,
  channel: channel$5,
  getegid: getegid$5,
  geteuid: geteuid$5,
  getgid: getgid$5,
  getgroups: getgroups$5,
  getuid: getuid$5,
  setegid: setegid$5,
  seteuid: seteuid$5,
  setgid: setgid$5,
  setgroups: setgroups$5,
  setuid: setuid$5,
  permission: permission$5,
  mainModule: mainModule$5,
  _events: _events$5,
  _eventsCount: _eventsCount$5,
  _exiting: _exiting$5,
  _maxListeners: _maxListeners$5,
  _debugEnd: _debugEnd$5,
  _debugProcess: _debugProcess$5,
  _fatalException: _fatalException$5,
  _getActiveHandles: _getActiveHandles$5,
  _getActiveRequests: _getActiveRequests$5,
  _kill: _kill$5,
  _preload_modules: _preload_modules$5,
  _rawDebug: _rawDebug$5,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier$5,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier$5,
  _tickCallback: _tickCallback$5,
  _disconnect: _disconnect$5,
  _handleQueue: _handleQueue$5,
  _pendingMessage: _pendingMessage$5,
  _channel: _channel$5,
  _send: _send$5,
  _linkedBinding: _linkedBinding$5
};
globalThis.process = _process$5;
const _timeOrigin$5 = globalThis.performance?.timeOrigin ?? Date.now();
const _performanceNow$5 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin$5;
const nodeTiming$5 = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
let PerformanceEntry$3 = class PerformanceEntry {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow$5();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow$5() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
const PerformanceMark$3 = class PerformanceMark extends PerformanceEntry$3 {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
let PerformanceMeasure$3 = class PerformanceMeasure extends PerformanceEntry$3 {
  entryType = "measure";
};
let PerformanceResourceTiming$3 = class PerformanceResourceTiming extends PerformanceEntry$3 {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
let PerformanceObserverEntryList$3 = class PerformanceObserverEntryList {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
let Performance$3 = class Performance {
  __unenv__ = true;
  timeOrigin = _timeOrigin$5;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError$5("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming$5;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming$3("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin$5) {
      return _performanceNow$5();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark$3(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure$3(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError$5("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError$5("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError$5("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
let PerformanceObserver$3 = class PerformanceObserver {
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError$5("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError$5("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
const performance$5 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance$3();
if (!("__unenv__" in performance$5)) {
  const proto = Performance$3.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance$5)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance$5, key, desc);
      }
    }
  }
}
globalThis.performance = performance$5;
globalThis.Performance = Performance$3;
globalThis.PerformanceEntry = PerformanceEntry$3;
globalThis.PerformanceMark = PerformanceMark$3;
globalThis.PerformanceMeasure = PerformanceMeasure$3;
globalThis.PerformanceObserver = PerformanceObserver$3;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList$3;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming$3;
const hrtime$5 = /* @__PURE__ */ Object.assign(function hrtime3(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, { bigint: function bigint2() {
  return BigInt(Date.now() * 1e6);
} });
class ReadStream2 {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
}
class WriteStream2 {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
}
// @__NO_SIDE_EFFECTS__
function createNotImplementedError$4(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented$4(name) {
  const fn = () => {
    throw /* @__PURE__ */ createNotImplementedError$4(name);
  };
  return Object.assign(fn, { __unenv__: true });
}
const NODE_VERSION$4 = "22.14.0";
class Process2 extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process2.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream2(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream2(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream2(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION$4}`;
  }
  get versions() {
    return { node: NODE_VERSION$4 };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError$4("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented$4("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented$4("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented$4("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented$4("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented$4("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented$4("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
}
const globalProcess$4 = globalThis["process"];
const getBuiltinModule$4 = globalProcess$4.getBuiltinModule;
const workerdProcess$4 = getBuiltinModule$4("node:process");
const unenvProcess$4 = new Process2({
  env: globalProcess$4.env,
  hrtime: hrtime$5,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess$4.nextTick
});
const { exit: exit$4, features: features$4, platform: platform$4 } = workerdProcess$4;
const {
  _channel: _channel$4,
  _debugEnd: _debugEnd$4,
  _debugProcess: _debugProcess$4,
  _disconnect: _disconnect$4,
  _events: _events$4,
  _eventsCount: _eventsCount$4,
  _exiting: _exiting$4,
  _fatalException: _fatalException$4,
  _getActiveHandles: _getActiveHandles$4,
  _getActiveRequests: _getActiveRequests$4,
  _handleQueue: _handleQueue$4,
  _kill: _kill$4,
  _linkedBinding: _linkedBinding$4,
  _maxListeners: _maxListeners$4,
  _pendingMessage: _pendingMessage$4,
  _preload_modules: _preload_modules$4,
  _rawDebug: _rawDebug$4,
  _send: _send$4,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier$4,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier$4,
  _tickCallback: _tickCallback$4,
  abort: abort$4,
  addListener: addListener$4,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags$4,
  arch: arch$4,
  argv: argv$4,
  argv0: argv0$4,
  assert: assert$4,
  availableMemory: availableMemory$4,
  binding: binding$4,
  channel: channel$4,
  chdir: chdir$4,
  config: config$4,
  connected: connected$4,
  constrainedMemory: constrainedMemory$4,
  cpuUsage: cpuUsage$4,
  cwd: cwd$4,
  debugPort: debugPort$4,
  disconnect: disconnect$4,
  dlopen: dlopen$4,
  domain: domain$4,
  emit: emit$4,
  emitWarning: emitWarning$4,
  env: env$4,
  eventNames: eventNames$4,
  execArgv: execArgv$4,
  execPath: execPath$4,
  exitCode: exitCode$4,
  finalization: finalization$4,
  getActiveResourcesInfo: getActiveResourcesInfo$4,
  getegid: getegid$4,
  geteuid: geteuid$4,
  getgid: getgid$4,
  getgroups: getgroups$4,
  getMaxListeners: getMaxListeners$4,
  getuid: getuid$4,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback$4,
  hrtime: hrtime22,
  initgroups: initgroups$4,
  kill: kill$4,
  listenerCount: listenerCount$4,
  listeners: listeners$4,
  loadEnvFile: loadEnvFile$4,
  mainModule: mainModule$4,
  memoryUsage: memoryUsage$4,
  moduleLoadList: moduleLoadList$4,
  nextTick: nextTick$4,
  off: off$4,
  on: on$4,
  once: once$4,
  openStdin: openStdin$4,
  permission: permission$4,
  pid: pid$4,
  ppid: ppid$4,
  prependListener: prependListener$4,
  prependOnceListener: prependOnceListener$4,
  rawListeners: rawListeners$4,
  reallyExit: reallyExit$4,
  ref: ref$4,
  release: release$4,
  removeAllListeners: removeAllListeners$4,
  removeListener: removeListener$4,
  report: report$4,
  resourceUsage: resourceUsage$4,
  send: send$4,
  setegid: setegid$4,
  seteuid: seteuid$4,
  setgid: setgid$4,
  setgroups: setgroups$4,
  setMaxListeners: setMaxListeners$4,
  setSourceMapsEnabled: setSourceMapsEnabled$4,
  setuid: setuid$4,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback$4,
  sourceMapsEnabled: sourceMapsEnabled$4,
  stderr: stderr$4,
  stdin: stdin$4,
  stdout: stdout$4,
  throwDeprecation: throwDeprecation$4,
  title: title$4,
  traceDeprecation: traceDeprecation$4,
  umask: umask$4,
  unref: unref$4,
  uptime: uptime$4,
  version: version$4,
  versions: versions$4
} = unenvProcess$4;
const _process$4 = {
  abort: abort$4,
  addListener: addListener$4,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags$4,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback$4,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback$4,
  loadEnvFile: loadEnvFile$4,
  sourceMapsEnabled: sourceMapsEnabled$4,
  arch: arch$4,
  argv: argv$4,
  argv0: argv0$4,
  chdir: chdir$4,
  config: config$4,
  connected: connected$4,
  constrainedMemory: constrainedMemory$4,
  availableMemory: availableMemory$4,
  cpuUsage: cpuUsage$4,
  cwd: cwd$4,
  debugPort: debugPort$4,
  dlopen: dlopen$4,
  disconnect: disconnect$4,
  emit: emit$4,
  emitWarning: emitWarning$4,
  env: env$4,
  eventNames: eventNames$4,
  execArgv: execArgv$4,
  execPath: execPath$4,
  exit: exit$4,
  finalization: finalization$4,
  features: features$4,
  getBuiltinModule: getBuiltinModule$4,
  getActiveResourcesInfo: getActiveResourcesInfo$4,
  getMaxListeners: getMaxListeners$4,
  hrtime: hrtime22,
  kill: kill$4,
  listeners: listeners$4,
  listenerCount: listenerCount$4,
  memoryUsage: memoryUsage$4,
  nextTick: nextTick$4,
  on: on$4,
  off: off$4,
  once: once$4,
  pid: pid$4,
  platform: platform$4,
  ppid: ppid$4,
  prependListener: prependListener$4,
  prependOnceListener: prependOnceListener$4,
  rawListeners: rawListeners$4,
  release: release$4,
  removeAllListeners: removeAllListeners$4,
  removeListener: removeListener$4,
  report: report$4,
  resourceUsage: resourceUsage$4,
  setMaxListeners: setMaxListeners$4,
  setSourceMapsEnabled: setSourceMapsEnabled$4,
  stderr: stderr$4,
  stdin: stdin$4,
  stdout: stdout$4,
  title: title$4,
  throwDeprecation: throwDeprecation$4,
  traceDeprecation: traceDeprecation$4,
  umask: umask$4,
  uptime: uptime$4,
  version: version$4,
  versions: versions$4,
  // @ts-expect-error old API
  domain: domain$4,
  initgroups: initgroups$4,
  moduleLoadList: moduleLoadList$4,
  reallyExit: reallyExit$4,
  openStdin: openStdin$4,
  assert: assert$4,
  binding: binding$4,
  send: send$4,
  exitCode: exitCode$4,
  channel: channel$4,
  getegid: getegid$4,
  geteuid: geteuid$4,
  getgid: getgid$4,
  getgroups: getgroups$4,
  getuid: getuid$4,
  setegid: setegid$4,
  seteuid: seteuid$4,
  setgid: setgid$4,
  setgroups: setgroups$4,
  setuid: setuid$4,
  permission: permission$4,
  mainModule: mainModule$4,
  _events: _events$4,
  _eventsCount: _eventsCount$4,
  _exiting: _exiting$4,
  _maxListeners: _maxListeners$4,
  _debugEnd: _debugEnd$4,
  _debugProcess: _debugProcess$4,
  _fatalException: _fatalException$4,
  _getActiveHandles: _getActiveHandles$4,
  _getActiveRequests: _getActiveRequests$4,
  _kill: _kill$4,
  _preload_modules: _preload_modules$4,
  _rawDebug: _rawDebug$4,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier$4,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier$4,
  _tickCallback: _tickCallback$4,
  _disconnect: _disconnect$4,
  _handleQueue: _handleQueue$4,
  _pendingMessage: _pendingMessage$4,
  _channel: _channel$4,
  _send: _send$4,
  _linkedBinding: _linkedBinding$4
};
globalThis.process = _process$4;
const _timeOrigin$4 = globalThis.performance?.timeOrigin ?? Date.now();
const _performanceNow$4 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin$4;
const nodeTiming$4 = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
class PerformanceEntry2 {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow$4();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow$4() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
}
const PerformanceMark2 = class PerformanceMark22 extends PerformanceEntry2 {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
class PerformanceMeasure2 extends PerformanceEntry2 {
  entryType = "measure";
}
class PerformanceResourceTiming2 extends PerformanceEntry2 {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
}
class PerformanceObserverEntryList2 {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
}
class Performance2 {
  __unenv__ = true;
  timeOrigin = _timeOrigin$4;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError$4("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming$4;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming2("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin$4) {
      return _performanceNow$4();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark2(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure2(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError$4("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError$4("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError$4("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
}
class PerformanceObserver2 {
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError$4("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError$4("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
}
const performance$4 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance2();
if (!("__unenv__" in performance$4)) {
  const proto = Performance2.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance$4)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance$4, key, desc);
      }
    }
  }
}
globalThis.performance = performance$4;
globalThis.Performance = Performance2;
globalThis.PerformanceEntry = PerformanceEntry2;
globalThis.PerformanceMark = PerformanceMark2;
globalThis.PerformanceMeasure = PerformanceMeasure2;
globalThis.PerformanceObserver = PerformanceObserver2;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList2;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming2;
const hrtime$4 = /* @__PURE__ */ Object.assign(function hrtime32(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, { bigint: function bigint22() {
  return BigInt(Date.now() * 1e6);
} });
let ReadStream$2 = class ReadStream22 {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};
let WriteStream$2 = class WriteStream22 {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};
// @__NO_SIDE_EFFECTS__
function createNotImplementedError$3(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented$3(name) {
  const fn = () => {
    throw /* @__PURE__ */ createNotImplementedError$3(name);
  };
  return Object.assign(fn, { __unenv__: true });
}
const NODE_VERSION$3 = "22.14.0";
let Process$2 = class Process22 extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process22.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream$2(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream$2(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream$2(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION$3}`;
  }
  get versions() {
    return { node: NODE_VERSION$3 };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError$3("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented$3("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented$3("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented$3("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented$3("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented$3("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented$3("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
const globalProcess$3 = globalThis["process"];
const getBuiltinModule$3 = globalProcess$3.getBuiltinModule;
const workerdProcess$3 = getBuiltinModule$3("node:process");
const unenvProcess$3 = new Process$2({
  env: globalProcess$3.env,
  hrtime: hrtime$4,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess$3.nextTick
});
const { exit: exit$3, features: features$3, platform: platform$3 } = workerdProcess$3;
const {
  _channel: _channel$3,
  _debugEnd: _debugEnd$3,
  _debugProcess: _debugProcess$3,
  _disconnect: _disconnect$3,
  _events: _events$3,
  _eventsCount: _eventsCount$3,
  _exiting: _exiting$3,
  _fatalException: _fatalException$3,
  _getActiveHandles: _getActiveHandles$3,
  _getActiveRequests: _getActiveRequests$3,
  _handleQueue: _handleQueue$3,
  _kill: _kill$3,
  _linkedBinding: _linkedBinding$3,
  _maxListeners: _maxListeners$3,
  _pendingMessage: _pendingMessage$3,
  _preload_modules: _preload_modules$3,
  _rawDebug: _rawDebug$3,
  _send: _send$3,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier$3,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier$3,
  _tickCallback: _tickCallback$3,
  abort: abort$3,
  addListener: addListener$3,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags$3,
  arch: arch$3,
  argv: argv$3,
  argv0: argv0$3,
  assert: assert$3,
  availableMemory: availableMemory$3,
  binding: binding$3,
  channel: channel$3,
  chdir: chdir$3,
  config: config$3,
  connected: connected$3,
  constrainedMemory: constrainedMemory$3,
  cpuUsage: cpuUsage$3,
  cwd: cwd$3,
  debugPort: debugPort$3,
  disconnect: disconnect$3,
  dlopen: dlopen$3,
  domain: domain$3,
  emit: emit$3,
  emitWarning: emitWarning$3,
  env: env$3,
  eventNames: eventNames$3,
  execArgv: execArgv$3,
  execPath: execPath$3,
  exitCode: exitCode$3,
  finalization: finalization$3,
  getActiveResourcesInfo: getActiveResourcesInfo$3,
  getegid: getegid$3,
  geteuid: geteuid$3,
  getgid: getgid$3,
  getgroups: getgroups$3,
  getMaxListeners: getMaxListeners$3,
  getuid: getuid$3,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback$3,
  hrtime: hrtime222,
  initgroups: initgroups$3,
  kill: kill$3,
  listenerCount: listenerCount$3,
  listeners: listeners$3,
  loadEnvFile: loadEnvFile$3,
  mainModule: mainModule$3,
  memoryUsage: memoryUsage$3,
  moduleLoadList: moduleLoadList$3,
  nextTick: nextTick$3,
  off: off$3,
  on: on$3,
  once: once$3,
  openStdin: openStdin$3,
  permission: permission$3,
  pid: pid$3,
  ppid: ppid$3,
  prependListener: prependListener$3,
  prependOnceListener: prependOnceListener$3,
  rawListeners: rawListeners$3,
  reallyExit: reallyExit$3,
  ref: ref$3,
  release: release$3,
  removeAllListeners: removeAllListeners$3,
  removeListener: removeListener$3,
  report: report$3,
  resourceUsage: resourceUsage$3,
  send: send$3,
  setegid: setegid$3,
  seteuid: seteuid$3,
  setgid: setgid$3,
  setgroups: setgroups$3,
  setMaxListeners: setMaxListeners$3,
  setSourceMapsEnabled: setSourceMapsEnabled$3,
  setuid: setuid$3,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback$3,
  sourceMapsEnabled: sourceMapsEnabled$3,
  stderr: stderr$3,
  stdin: stdin$3,
  stdout: stdout$3,
  throwDeprecation: throwDeprecation$3,
  title: title$3,
  traceDeprecation: traceDeprecation$3,
  umask: umask$3,
  unref: unref$3,
  uptime: uptime$3,
  version: version$3,
  versions: versions$3
} = unenvProcess$3;
const _process$3 = {
  abort: abort$3,
  addListener: addListener$3,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags$3,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback$3,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback$3,
  loadEnvFile: loadEnvFile$3,
  sourceMapsEnabled: sourceMapsEnabled$3,
  arch: arch$3,
  argv: argv$3,
  argv0: argv0$3,
  chdir: chdir$3,
  config: config$3,
  connected: connected$3,
  constrainedMemory: constrainedMemory$3,
  availableMemory: availableMemory$3,
  cpuUsage: cpuUsage$3,
  cwd: cwd$3,
  debugPort: debugPort$3,
  dlopen: dlopen$3,
  disconnect: disconnect$3,
  emit: emit$3,
  emitWarning: emitWarning$3,
  env: env$3,
  eventNames: eventNames$3,
  execArgv: execArgv$3,
  execPath: execPath$3,
  exit: exit$3,
  finalization: finalization$3,
  features: features$3,
  getBuiltinModule: getBuiltinModule$3,
  getActiveResourcesInfo: getActiveResourcesInfo$3,
  getMaxListeners: getMaxListeners$3,
  hrtime: hrtime222,
  kill: kill$3,
  listeners: listeners$3,
  listenerCount: listenerCount$3,
  memoryUsage: memoryUsage$3,
  nextTick: nextTick$3,
  on: on$3,
  off: off$3,
  once: once$3,
  pid: pid$3,
  platform: platform$3,
  ppid: ppid$3,
  prependListener: prependListener$3,
  prependOnceListener: prependOnceListener$3,
  rawListeners: rawListeners$3,
  release: release$3,
  removeAllListeners: removeAllListeners$3,
  removeListener: removeListener$3,
  report: report$3,
  resourceUsage: resourceUsage$3,
  setMaxListeners: setMaxListeners$3,
  setSourceMapsEnabled: setSourceMapsEnabled$3,
  stderr: stderr$3,
  stdin: stdin$3,
  stdout: stdout$3,
  title: title$3,
  throwDeprecation: throwDeprecation$3,
  traceDeprecation: traceDeprecation$3,
  umask: umask$3,
  uptime: uptime$3,
  version: version$3,
  versions: versions$3,
  // @ts-expect-error old API
  domain: domain$3,
  initgroups: initgroups$3,
  moduleLoadList: moduleLoadList$3,
  reallyExit: reallyExit$3,
  openStdin: openStdin$3,
  assert: assert$3,
  binding: binding$3,
  send: send$3,
  exitCode: exitCode$3,
  channel: channel$3,
  getegid: getegid$3,
  geteuid: geteuid$3,
  getgid: getgid$3,
  getgroups: getgroups$3,
  getuid: getuid$3,
  setegid: setegid$3,
  seteuid: seteuid$3,
  setgid: setgid$3,
  setgroups: setgroups$3,
  setuid: setuid$3,
  permission: permission$3,
  mainModule: mainModule$3,
  _events: _events$3,
  _eventsCount: _eventsCount$3,
  _exiting: _exiting$3,
  _maxListeners: _maxListeners$3,
  _debugEnd: _debugEnd$3,
  _debugProcess: _debugProcess$3,
  _fatalException: _fatalException$3,
  _getActiveHandles: _getActiveHandles$3,
  _getActiveRequests: _getActiveRequests$3,
  _kill: _kill$3,
  _preload_modules: _preload_modules$3,
  _rawDebug: _rawDebug$3,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier$3,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier$3,
  _tickCallback: _tickCallback$3,
  _disconnect: _disconnect$3,
  _handleQueue: _handleQueue$3,
  _pendingMessage: _pendingMessage$3,
  _channel: _channel$3,
  _send: _send$3,
  _linkedBinding: _linkedBinding$3
};
globalThis.process = _process$3;
const _timeOrigin$3 = globalThis.performance?.timeOrigin ?? Date.now();
const _performanceNow$3 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin$3;
const nodeTiming$3 = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
let PerformanceEntry$2 = class PerformanceEntry22 {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow$3();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow$3() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
const PerformanceMark$2 = class PerformanceMark3 extends PerformanceEntry$2 {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
let PerformanceMeasure$2 = class PerformanceMeasure22 extends PerformanceEntry$2 {
  entryType = "measure";
};
let PerformanceResourceTiming$2 = class PerformanceResourceTiming22 extends PerformanceEntry$2 {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
let PerformanceObserverEntryList$2 = class PerformanceObserverEntryList22 {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
let Performance$2 = class Performance22 {
  __unenv__ = true;
  timeOrigin = _timeOrigin$3;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError$3("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming$3;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming$2("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin$3) {
      return _performanceNow$3();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark$2(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure$2(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError$3("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError$3("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError$3("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
let PerformanceObserver$2 = class PerformanceObserver22 {
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError$3("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError$3("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
const performance$3 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance$2();
if (!("__unenv__" in performance$3)) {
  const proto = Performance$2.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance$3)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance$3, key, desc);
      }
    }
  }
}
globalThis.performance = performance$3;
globalThis.Performance = Performance$2;
globalThis.PerformanceEntry = PerformanceEntry$2;
globalThis.PerformanceMark = PerformanceMark$2;
globalThis.PerformanceMeasure = PerformanceMeasure$2;
globalThis.PerformanceObserver = PerformanceObserver$2;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList$2;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming$2;
const hrtime$3 = /* @__PURE__ */ Object.assign(function hrtime322(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, { bigint: function bigint222() {
  return BigInt(Date.now() * 1e6);
} });
class ReadStream222 {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
}
class WriteStream222 {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
}
// @__NO_SIDE_EFFECTS__
function createNotImplementedError$2(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented$2(name) {
  const fn = () => {
    throw /* @__PURE__ */ createNotImplementedError$2(name);
  };
  return Object.assign(fn, { __unenv__: true });
}
const NODE_VERSION$2 = "22.14.0";
class Process222 extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process222.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream222(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream222(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream222(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION$2}`;
  }
  get versions() {
    return { node: NODE_VERSION$2 };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError$2("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented$2("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented$2("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented$2("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented$2("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented$2("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented$2("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
}
const globalProcess$2 = globalThis["process"];
const getBuiltinModule$2 = globalProcess$2.getBuiltinModule;
const workerdProcess$2 = getBuiltinModule$2("node:process");
const unenvProcess$2 = new Process222({
  env: globalProcess$2.env,
  hrtime: hrtime$3,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess$2.nextTick
});
const { exit: exit$2, features: features$2, platform: platform$2 } = workerdProcess$2;
const {
  _channel: _channel$2,
  _debugEnd: _debugEnd$2,
  _debugProcess: _debugProcess$2,
  _disconnect: _disconnect$2,
  _events: _events$2,
  _eventsCount: _eventsCount$2,
  _exiting: _exiting$2,
  _fatalException: _fatalException$2,
  _getActiveHandles: _getActiveHandles$2,
  _getActiveRequests: _getActiveRequests$2,
  _handleQueue: _handleQueue$2,
  _kill: _kill$2,
  _linkedBinding: _linkedBinding$2,
  _maxListeners: _maxListeners$2,
  _pendingMessage: _pendingMessage$2,
  _preload_modules: _preload_modules$2,
  _rawDebug: _rawDebug$2,
  _send: _send$2,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier$2,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier$2,
  _tickCallback: _tickCallback$2,
  abort: abort$2,
  addListener: addListener$2,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags$2,
  arch: arch$2,
  argv: argv$2,
  argv0: argv0$2,
  assert: assert$2,
  availableMemory: availableMemory$2,
  binding: binding$2,
  channel: channel$2,
  chdir: chdir$2,
  config: config$2,
  connected: connected$2,
  constrainedMemory: constrainedMemory$2,
  cpuUsage: cpuUsage$2,
  cwd: cwd$2,
  debugPort: debugPort$2,
  disconnect: disconnect$2,
  dlopen: dlopen$2,
  domain: domain$2,
  emit: emit$2,
  emitWarning: emitWarning$2,
  env: env$2,
  eventNames: eventNames$2,
  execArgv: execArgv$2,
  execPath: execPath$2,
  exitCode: exitCode$2,
  finalization: finalization$2,
  getActiveResourcesInfo: getActiveResourcesInfo$2,
  getegid: getegid$2,
  geteuid: geteuid$2,
  getgid: getgid$2,
  getgroups: getgroups$2,
  getMaxListeners: getMaxListeners$2,
  getuid: getuid$2,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback$2,
  hrtime: hrtime2222,
  initgroups: initgroups$2,
  kill: kill$2,
  listenerCount: listenerCount$2,
  listeners: listeners$2,
  loadEnvFile: loadEnvFile$2,
  mainModule: mainModule$2,
  memoryUsage: memoryUsage$2,
  moduleLoadList: moduleLoadList$2,
  nextTick: nextTick$2,
  off: off$2,
  on: on$2,
  once: once$2,
  openStdin: openStdin$2,
  permission: permission$2,
  pid: pid$2,
  ppid: ppid$2,
  prependListener: prependListener$2,
  prependOnceListener: prependOnceListener$2,
  rawListeners: rawListeners$2,
  reallyExit: reallyExit$2,
  ref: ref$2,
  release: release$2,
  removeAllListeners: removeAllListeners$2,
  removeListener: removeListener$2,
  report: report$2,
  resourceUsage: resourceUsage$2,
  send: send$2,
  setegid: setegid$2,
  seteuid: seteuid$2,
  setgid: setgid$2,
  setgroups: setgroups$2,
  setMaxListeners: setMaxListeners$2,
  setSourceMapsEnabled: setSourceMapsEnabled$2,
  setuid: setuid$2,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback$2,
  sourceMapsEnabled: sourceMapsEnabled$2,
  stderr: stderr$2,
  stdin: stdin$2,
  stdout: stdout$2,
  throwDeprecation: throwDeprecation$2,
  title: title$2,
  traceDeprecation: traceDeprecation$2,
  umask: umask$2,
  unref: unref$2,
  uptime: uptime$2,
  version: version$2,
  versions: versions$2
} = unenvProcess$2;
const _process$2 = {
  abort: abort$2,
  addListener: addListener$2,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags$2,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback$2,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback$2,
  loadEnvFile: loadEnvFile$2,
  sourceMapsEnabled: sourceMapsEnabled$2,
  arch: arch$2,
  argv: argv$2,
  argv0: argv0$2,
  chdir: chdir$2,
  config: config$2,
  connected: connected$2,
  constrainedMemory: constrainedMemory$2,
  availableMemory: availableMemory$2,
  cpuUsage: cpuUsage$2,
  cwd: cwd$2,
  debugPort: debugPort$2,
  dlopen: dlopen$2,
  disconnect: disconnect$2,
  emit: emit$2,
  emitWarning: emitWarning$2,
  env: env$2,
  eventNames: eventNames$2,
  execArgv: execArgv$2,
  execPath: execPath$2,
  exit: exit$2,
  finalization: finalization$2,
  features: features$2,
  getBuiltinModule: getBuiltinModule$2,
  getActiveResourcesInfo: getActiveResourcesInfo$2,
  getMaxListeners: getMaxListeners$2,
  hrtime: hrtime2222,
  kill: kill$2,
  listeners: listeners$2,
  listenerCount: listenerCount$2,
  memoryUsage: memoryUsage$2,
  nextTick: nextTick$2,
  on: on$2,
  off: off$2,
  once: once$2,
  pid: pid$2,
  platform: platform$2,
  ppid: ppid$2,
  prependListener: prependListener$2,
  prependOnceListener: prependOnceListener$2,
  rawListeners: rawListeners$2,
  release: release$2,
  removeAllListeners: removeAllListeners$2,
  removeListener: removeListener$2,
  report: report$2,
  resourceUsage: resourceUsage$2,
  setMaxListeners: setMaxListeners$2,
  setSourceMapsEnabled: setSourceMapsEnabled$2,
  stderr: stderr$2,
  stdin: stdin$2,
  stdout: stdout$2,
  title: title$2,
  throwDeprecation: throwDeprecation$2,
  traceDeprecation: traceDeprecation$2,
  umask: umask$2,
  uptime: uptime$2,
  version: version$2,
  versions: versions$2,
  // @ts-expect-error old API
  domain: domain$2,
  initgroups: initgroups$2,
  moduleLoadList: moduleLoadList$2,
  reallyExit: reallyExit$2,
  openStdin: openStdin$2,
  assert: assert$2,
  binding: binding$2,
  send: send$2,
  exitCode: exitCode$2,
  channel: channel$2,
  getegid: getegid$2,
  geteuid: geteuid$2,
  getgid: getgid$2,
  getgroups: getgroups$2,
  getuid: getuid$2,
  setegid: setegid$2,
  seteuid: seteuid$2,
  setgid: setgid$2,
  setgroups: setgroups$2,
  setuid: setuid$2,
  permission: permission$2,
  mainModule: mainModule$2,
  _events: _events$2,
  _eventsCount: _eventsCount$2,
  _exiting: _exiting$2,
  _maxListeners: _maxListeners$2,
  _debugEnd: _debugEnd$2,
  _debugProcess: _debugProcess$2,
  _fatalException: _fatalException$2,
  _getActiveHandles: _getActiveHandles$2,
  _getActiveRequests: _getActiveRequests$2,
  _kill: _kill$2,
  _preload_modules: _preload_modules$2,
  _rawDebug: _rawDebug$2,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier$2,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier$2,
  _tickCallback: _tickCallback$2,
  _disconnect: _disconnect$2,
  _handleQueue: _handleQueue$2,
  _pendingMessage: _pendingMessage$2,
  _channel: _channel$2,
  _send: _send$2,
  _linkedBinding: _linkedBinding$2
};
globalThis.process = _process$2;
const _timeOrigin$2 = globalThis.performance?.timeOrigin ?? Date.now();
const _performanceNow$2 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin$2;
const nodeTiming$2 = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
class PerformanceEntry222 {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow$2();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow$2() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
}
const PerformanceMark222 = class PerformanceMark2222 extends PerformanceEntry222 {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
class PerformanceMeasure222 extends PerformanceEntry222 {
  entryType = "measure";
}
class PerformanceResourceTiming222 extends PerformanceEntry222 {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
}
class PerformanceObserverEntryList222 {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
}
class Performance222 {
  __unenv__ = true;
  timeOrigin = _timeOrigin$2;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError$2("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming$2;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming222("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin$2) {
      return _performanceNow$2();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark222(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure222(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError$2("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError$2("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError$2("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
}
class PerformanceObserver222 {
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError$2("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError$2("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
}
const performance$2 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance222();
if (!("__unenv__" in performance$2)) {
  const proto = Performance222.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance$2)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance$2, key, desc);
      }
    }
  }
}
globalThis.performance = performance$2;
globalThis.Performance = Performance222;
globalThis.PerformanceEntry = PerformanceEntry222;
globalThis.PerformanceMark = PerformanceMark222;
globalThis.PerformanceMeasure = PerformanceMeasure222;
globalThis.PerformanceObserver = PerformanceObserver222;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList222;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming222;
const hrtime$2 = /* @__PURE__ */ Object.assign(function hrtime3222(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, { bigint: function bigint2222() {
  return BigInt(Date.now() * 1e6);
} });
let ReadStream$1 = class ReadStream2222 {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};
let WriteStream$1 = class WriteStream2222 {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};
// @__NO_SIDE_EFFECTS__
function createNotImplementedError$1(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented$1(name) {
  const fn = () => {
    throw /* @__PURE__ */ createNotImplementedError$1(name);
  };
  return Object.assign(fn, { __unenv__: true });
}
const NODE_VERSION$1 = "22.14.0";
let Process$1 = class Process2222 extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process2222.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream$1(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream$1(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream$1(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION$1}`;
  }
  get versions() {
    return { node: NODE_VERSION$1 };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError$1("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented$1("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented$1("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented$1("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented$1("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented$1("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented$1("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
const globalProcess$1 = globalThis["process"];
const getBuiltinModule$1 = globalProcess$1.getBuiltinModule;
const workerdProcess$1 = getBuiltinModule$1("node:process");
const unenvProcess$1 = new Process$1({
  env: globalProcess$1.env,
  hrtime: hrtime$2,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess$1.nextTick
});
const { exit: exit$1, features: features$1, platform: platform$1 } = workerdProcess$1;
const {
  _channel: _channel$1,
  _debugEnd: _debugEnd$1,
  _debugProcess: _debugProcess$1,
  _disconnect: _disconnect$1,
  _events: _events$1,
  _eventsCount: _eventsCount$1,
  _exiting: _exiting$1,
  _fatalException: _fatalException$1,
  _getActiveHandles: _getActiveHandles$1,
  _getActiveRequests: _getActiveRequests$1,
  _handleQueue: _handleQueue$1,
  _kill: _kill$1,
  _linkedBinding: _linkedBinding$1,
  _maxListeners: _maxListeners$1,
  _pendingMessage: _pendingMessage$1,
  _preload_modules: _preload_modules$1,
  _rawDebug: _rawDebug$1,
  _send: _send$1,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier$1,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier$1,
  _tickCallback: _tickCallback$1,
  abort: abort$1,
  addListener: addListener$1,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags$1,
  arch: arch$1,
  argv: argv$1,
  argv0: argv0$1,
  assert: assert$1,
  availableMemory: availableMemory$1,
  binding: binding$1,
  channel: channel$1,
  chdir: chdir$1,
  config: config$1,
  connected: connected$1,
  constrainedMemory: constrainedMemory$1,
  cpuUsage: cpuUsage$1,
  cwd: cwd$1,
  debugPort: debugPort$1,
  disconnect: disconnect$1,
  dlopen: dlopen$1,
  domain: domain$1,
  emit: emit$1,
  emitWarning: emitWarning$1,
  env: env$1,
  eventNames: eventNames$1,
  execArgv: execArgv$1,
  execPath: execPath$1,
  exitCode: exitCode$1,
  finalization: finalization$1,
  getActiveResourcesInfo: getActiveResourcesInfo$1,
  getegid: getegid$1,
  geteuid: geteuid$1,
  getgid: getgid$1,
  getgroups: getgroups$1,
  getMaxListeners: getMaxListeners$1,
  getuid: getuid$1,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback$1,
  hrtime: hrtime22222,
  initgroups: initgroups$1,
  kill: kill$1,
  listenerCount: listenerCount$1,
  listeners: listeners$1,
  loadEnvFile: loadEnvFile$1,
  mainModule: mainModule$1,
  memoryUsage: memoryUsage$1,
  moduleLoadList: moduleLoadList$1,
  nextTick: nextTick$1,
  off: off$1,
  on: on$1,
  once: once$1,
  openStdin: openStdin$1,
  permission: permission$1,
  pid: pid$1,
  ppid: ppid$1,
  prependListener: prependListener$1,
  prependOnceListener: prependOnceListener$1,
  rawListeners: rawListeners$1,
  reallyExit: reallyExit$1,
  ref: ref$1,
  release: release$1,
  removeAllListeners: removeAllListeners$1,
  removeListener: removeListener$1,
  report: report$1,
  resourceUsage: resourceUsage$1,
  send: send$1,
  setegid: setegid$1,
  seteuid: seteuid$1,
  setgid: setgid$1,
  setgroups: setgroups$1,
  setMaxListeners: setMaxListeners$1,
  setSourceMapsEnabled: setSourceMapsEnabled$1,
  setuid: setuid$1,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback$1,
  sourceMapsEnabled: sourceMapsEnabled$1,
  stderr: stderr$1,
  stdin: stdin$1,
  stdout: stdout$1,
  throwDeprecation: throwDeprecation$1,
  title: title$1,
  traceDeprecation: traceDeprecation$1,
  umask: umask$1,
  unref: unref$1,
  uptime: uptime$1,
  version: version$1,
  versions: versions$1
} = unenvProcess$1;
const _process$1 = {
  abort: abort$1,
  addListener: addListener$1,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags$1,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback$1,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback$1,
  loadEnvFile: loadEnvFile$1,
  sourceMapsEnabled: sourceMapsEnabled$1,
  arch: arch$1,
  argv: argv$1,
  argv0: argv0$1,
  chdir: chdir$1,
  config: config$1,
  connected: connected$1,
  constrainedMemory: constrainedMemory$1,
  availableMemory: availableMemory$1,
  cpuUsage: cpuUsage$1,
  cwd: cwd$1,
  debugPort: debugPort$1,
  dlopen: dlopen$1,
  disconnect: disconnect$1,
  emit: emit$1,
  emitWarning: emitWarning$1,
  env: env$1,
  eventNames: eventNames$1,
  execArgv: execArgv$1,
  execPath: execPath$1,
  exit: exit$1,
  finalization: finalization$1,
  features: features$1,
  getBuiltinModule: getBuiltinModule$1,
  getActiveResourcesInfo: getActiveResourcesInfo$1,
  getMaxListeners: getMaxListeners$1,
  hrtime: hrtime22222,
  kill: kill$1,
  listeners: listeners$1,
  listenerCount: listenerCount$1,
  memoryUsage: memoryUsage$1,
  nextTick: nextTick$1,
  on: on$1,
  off: off$1,
  once: once$1,
  pid: pid$1,
  platform: platform$1,
  ppid: ppid$1,
  prependListener: prependListener$1,
  prependOnceListener: prependOnceListener$1,
  rawListeners: rawListeners$1,
  release: release$1,
  removeAllListeners: removeAllListeners$1,
  removeListener: removeListener$1,
  report: report$1,
  resourceUsage: resourceUsage$1,
  setMaxListeners: setMaxListeners$1,
  setSourceMapsEnabled: setSourceMapsEnabled$1,
  stderr: stderr$1,
  stdin: stdin$1,
  stdout: stdout$1,
  title: title$1,
  throwDeprecation: throwDeprecation$1,
  traceDeprecation: traceDeprecation$1,
  umask: umask$1,
  uptime: uptime$1,
  version: version$1,
  versions: versions$1,
  // @ts-expect-error old API
  domain: domain$1,
  initgroups: initgroups$1,
  moduleLoadList: moduleLoadList$1,
  reallyExit: reallyExit$1,
  openStdin: openStdin$1,
  assert: assert$1,
  binding: binding$1,
  send: send$1,
  exitCode: exitCode$1,
  channel: channel$1,
  getegid: getegid$1,
  geteuid: geteuid$1,
  getgid: getgid$1,
  getgroups: getgroups$1,
  getuid: getuid$1,
  setegid: setegid$1,
  seteuid: seteuid$1,
  setgid: setgid$1,
  setgroups: setgroups$1,
  setuid: setuid$1,
  permission: permission$1,
  mainModule: mainModule$1,
  _events: _events$1,
  _eventsCount: _eventsCount$1,
  _exiting: _exiting$1,
  _maxListeners: _maxListeners$1,
  _debugEnd: _debugEnd$1,
  _debugProcess: _debugProcess$1,
  _fatalException: _fatalException$1,
  _getActiveHandles: _getActiveHandles$1,
  _getActiveRequests: _getActiveRequests$1,
  _kill: _kill$1,
  _preload_modules: _preload_modules$1,
  _rawDebug: _rawDebug$1,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier$1,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier$1,
  _tickCallback: _tickCallback$1,
  _disconnect: _disconnect$1,
  _handleQueue: _handleQueue$1,
  _pendingMessage: _pendingMessage$1,
  _channel: _channel$1,
  _send: _send$1,
  _linkedBinding: _linkedBinding$1
};
globalThis.process = _process$1;
const _timeOrigin$1 = globalThis.performance?.timeOrigin ?? Date.now();
const _performanceNow$1 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin$1;
const nodeTiming$1 = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
let PerformanceEntry$1 = class PerformanceEntry2222 {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow$1();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow$1() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
const PerformanceMark$1 = class PerformanceMark32 extends PerformanceEntry$1 {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
let PerformanceMeasure$1 = class PerformanceMeasure2222 extends PerformanceEntry$1 {
  entryType = "measure";
};
let PerformanceResourceTiming$1 = class PerformanceResourceTiming2222 extends PerformanceEntry$1 {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
let PerformanceObserverEntryList$1 = class PerformanceObserverEntryList2222 {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
let Performance$1 = class Performance2222 {
  __unenv__ = true;
  timeOrigin = _timeOrigin$1;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError$1("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming$1;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming$1("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin$1) {
      return _performanceNow$1();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark$1(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure$1(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError$1("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError$1("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError$1("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
let PerformanceObserver$1 = class PerformanceObserver2222 {
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError$1("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError$1("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
const performance$1 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance$1();
if (!("__unenv__" in performance$1)) {
  const proto = Performance$1.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance$1)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance$1, key, desc);
      }
    }
  }
}
globalThis.performance = performance$1;
globalThis.Performance = Performance$1;
globalThis.PerformanceEntry = PerformanceEntry$1;
globalThis.PerformanceMark = PerformanceMark$1;
globalThis.PerformanceMeasure = PerformanceMeasure$1;
globalThis.PerformanceObserver = PerformanceObserver$1;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList$1;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming$1;
const hrtime$1 = /* @__PURE__ */ Object.assign(function hrtime32222(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, { bigint: function bigint22222() {
  return BigInt(Date.now() * 1e6);
} });
class ReadStream22222 {
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
}
class WriteStream22222 {
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env2) {
    return 1;
  }
  hasColors(count, env2) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
}
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = () => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  };
  return Object.assign(fn, { __unenv__: true });
}
const NODE_VERSION = "22.14.0";
class Process22222 extends EventEmitter {
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(Process22222.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream22222(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream22222(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream22222(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd2) {
    this.#cwd = cwd2;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: () => 0 });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
}
const globalProcess = globalThis["process"];
const getBuiltinModule = globalProcess.getBuiltinModule;
const workerdProcess = getBuiltinModule("node:process");
const unenvProcess = new Process22222({
  env: globalProcess.env,
  hrtime: hrtime$1,
  // `nextTick` is available from workerd process v1
  nextTick: workerdProcess.nextTick
});
const { exit, features, platform } = workerdProcess;
const {
  _channel,
  _debugEnd,
  _debugProcess,
  _disconnect,
  _events,
  _eventsCount,
  _exiting,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _handleQueue,
  _kill,
  _linkedBinding,
  _maxListeners,
  _pendingMessage,
  _preload_modules,
  _rawDebug,
  _send,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  arch,
  argv,
  argv0,
  assert,
  availableMemory,
  binding,
  channel,
  chdir,
  config,
  connected,
  constrainedMemory,
  cpuUsage,
  cwd,
  debugPort,
  disconnect,
  dlopen,
  domain,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exitCode,
  finalization,
  getActiveResourcesInfo,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getMaxListeners,
  getuid,
  hasUncaughtExceptionCaptureCallback,
  hrtime: hrtime222222,
  initgroups,
  kill,
  listenerCount,
  listeners,
  loadEnvFile,
  mainModule,
  memoryUsage,
  moduleLoadList,
  nextTick,
  off,
  on,
  once,
  openStdin,
  permission,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  reallyExit,
  ref,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  send,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setMaxListeners,
  setSourceMapsEnabled,
  setuid,
  setUncaughtExceptionCaptureCallback,
  sourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  throwDeprecation,
  title,
  traceDeprecation,
  umask,
  unref,
  uptime,
  version,
  versions
} = unenvProcess;
const _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime222222,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
globalThis.process = _process;
const _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
const _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
const nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
class PerformanceEntry22222 {
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
}
const PerformanceMark22222 = class PerformanceMark222222 extends PerformanceEntry22222 {
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
class PerformanceMeasure22222 extends PerformanceEntry22222 {
  entryType = "measure";
}
class PerformanceResourceTiming22222 extends PerformanceEntry22222 {
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
}
class PerformanceObserverEntryList22222 {
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
}
class Performance22222 {
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming22222("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark22222(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure22222(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
}
class PerformanceObserver22222 {
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
}
const performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance22222();
if (!("__unenv__" in performance)) {
  const proto = Performance22222.prototype;
  for (const key of Object.getOwnPropertyNames(proto)) {
    if (key !== "constructor" && !(key in performance)) {
      const desc = Object.getOwnPropertyDescriptor(proto, key);
      if (desc) {
        Object.defineProperty(performance, key, desc);
      }
    }
  }
}
globalThis.performance = performance;
globalThis.Performance = Performance22222;
globalThis.PerformanceEntry = PerformanceEntry22222;
globalThis.PerformanceMark = PerformanceMark22222;
globalThis.PerformanceMeasure = PerformanceMeasure22222;
globalThis.PerformanceObserver = PerformanceObserver22222;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList22222;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming22222;
let lastCapturedError;
const TTL_MS = 5e3;
function record(error) {
  lastCapturedError = { error, at: Date.now() };
}
if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record(event.error ?? event));
  globalThis.addEventListener(
    "unhandledrejection",
    (event) => record(event.reason)
  );
}
function consumeLastCapturedError() {
  if (!lastCapturedError) return void 0;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = void 0;
    return void 0;
  }
  const { error } = lastCapturedError;
  lastCapturedError = void 0;
  return error;
}
function renderErrorPage() {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>This page didn't load</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body { font: 15px/1.5 system-ui, -apple-system, sans-serif; background: #fafafa; color: #111; display: grid; place-items: center; min-height: 100vh; margin: 0; padding: 1.5rem; }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; }
      p { color: #4b5563; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button { padding: 0.5rem 1rem; border-radius: 0.375rem; font: inherit; cursor: pointer; text-decoration: none; border: 1px solid transparent; }
      .primary { background: #111; color: #fff; }
      .secondary { background: #fff; color: #111; border-color: #d1d5db; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>This page didn't load</h1>
      <p>Something went wrong on our end. You can try refreshing or head back home.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Try again</button>
        <a class="secondary" href="/">Go home</a>
      </div>
    </div>
  </body>
</html>`;
}
let serverEntryPromise;
async function getServerEntry() {
  if (!serverEntryPromise) {
    serverEntryPromise = import("./assets/server-AHFj_Bgy-gsoihpy4-CbyuSDu4-Ble6ghI2-BbTWyedm-DMY4rmEE-B4C4KxOU.js").then((n) => n.a6).then((n) => n.s).then(
      (m) => m.default ?? m
    );
  }
  return serverEntryPromise;
}
function brandedErrorResponse() {
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" }
  });
}
function isCatastrophicSsrErrorBody(body, responseStatus) {
  let payload;
  try {
    payload = JSON.parse(body);
  } catch {
    return false;
  }
  if (!payload || Array.isArray(payload) || typeof payload !== "object") {
    return false;
  }
  const fields = payload;
  const expectedKeys = /* @__PURE__ */ new Set(["message", "status", "unhandled"]);
  if (!Object.keys(fields).every((key) => expectedKeys.has(key))) {
    return false;
  }
  return fields.unhandled === true && fields.message === "HTTPError" && (fields.status === void 0 || fields.status === responseStatus);
}
async function normalizeCatastrophicSsrResponse(response) {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;
  const body = await response.clone().text();
  if (!isCatastrophicSsrErrorBody(body, response.status)) {
    return response;
  }
  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return brandedErrorResponse();
}
const server = {
  async fetch(request, env2, ctx) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env2, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return brandedErrorResponse();
    }
  }
};
const workerEntry$1 = server ?? {};
const workerEntry$2 = workerEntry$1 ?? {};
const workerEntry$3 = workerEntry$2 ?? {};
const workerEntry$4 = workerEntry$3 ?? {};
const workerEntry$5 = workerEntry$4 ?? {};
const workerEntry = workerEntry$5 ?? {};
export {
  workerEntry as default,
  renderErrorPage as r
};
