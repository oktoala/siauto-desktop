import os from 'os';
import fs from 'fs';

const isLinux = os.platform() === 'linux';
const isWindows = os.platform() === 'win32';
const isMac = os.platform() === 'darwin';
const brave = 'Brave';
const chrome = 'Chrome';
const edge = 'Edge';

// b = Brave
// c = Chrome
// mse = Microsoft Edge
// l = Linux
// w64 = Windows 64 Bit
// w32 = Windows 32 Bit

// Executable Linux
const blExe = '/usr/bin/brave';
const clExe = '/usr/bin/google-chrome-stable';
const mselExe = '/usr/bin/microsoft-edge-stable';

// Executable Windows
const cw64Exe = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const cw32Exe =
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const msew64Exe = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const msew32Exe =
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const bw64Exe =
  'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

// Executable Mac
const cmExe = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const bmExe = '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser';
const msemExe =
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge';

// Profile in Linux
const clProf = (user: string) => {
  return `/home/${user}/.config/google-chrome/Default`;
};

const blProf = (user: string) => {
  return `/home/${user}/.config/BraveSoftware/Brave-Browser/Default`;
};

const mseProf = (user: string) => {
  return `/home/${user}/.config/microsoft-edge/Default`;
};

// Profile in Windows

const cwProf = (user: string) => {
  return `C:\\Users\\${user}\\AppData\\Local\\Google\\Chrome\\User Data\\Default`;
};

const msewProf = (user: string) => {
  return `C:\\Users\\${user}\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default`;
};

const bwProf = (user: string) => {
  return `C:\\Users\\${user}\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data\\Default`;
};

// Profile in Mac

const cmProf = (user: string) => {
  return `/Users/${user}/Library/Application Support/Google/Chrome/Profile 3`;
};

const bmProf = (user: string) => {
  return `/Users/${user}/Library/Application Support/BraveSoftware/Brave-Browser/Default`;
};

const msemProf = (user: string) => {
  return `/Users/${user}/Library/Application Support/Microsoft Edge/Default`;
};

// Check Browser exist in Linux
const isBl = () => {
  return fs.existsSync(blExe);
};

const isCl = () => {
  return fs.existsSync(clExe);
};

const isMsel = () => {
  return fs.existsSync(mselExe);
};

// Windows

const isBw64 = () => {
  return fs.existsSync(bw64Exe);
};

const isCw64 = () => {
  return fs.existsSync(cw64Exe);
};

const isCw32 = () => {
  return fs.existsSync(cw32Exe);
};

const isMsew64 = () => {
  return fs.existsSync(msew64Exe);
};

const isMsew32 = () => {
  return fs.existsSync(msew32Exe);
};

// Check browser exist in Mac

const isCm = () => {
  return fs.existsSync(cmExe);
};

const isBm = () => {
  return fs.existsSync(bmExe);
};

const isMsem = () => {
  return fs.existsSync(msemExe);
};

export default {
  isLinux,
  isWindows,
  isMac,
  brave,
  chrome,
  edge,
  blExe,
  clExe,
  mselExe,
  bw64Exe,
  cw64Exe,
  cw32Exe,
  msew64Exe,
  msew32Exe,
  cmExe,
  bmExe,
  msemExe,
  clProf,
  blProf,
  mseProf,
  cwProf,
  msewProf,
  bwProf,
  cmProf,
  bmProf,
  msemProf,
  isBl,
  isCl,
  isMsel,
  isBw64,
  isCw64,
  isCw32,
  isMsew64,
  isMsew32,
  isCm,
  isBm,
  isMsem,
};
