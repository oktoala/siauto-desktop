import os from 'os';
import fs from 'fs';

const isLinux = os.platform() === 'linux';
const isWindows = os.platform() === 'win32';
const brave = 'Brave';
const chrome = 'Chrome';
const edge = 'Edge';

// b = Brave
// c = Chrome
// mse = Microsoft Edge
// l = Linux
// w64 = Windows 64 Bit
// w32 = Windows 32 Bit

const blExe = '/usr/bin/brave';
const clExe = '/usr/bin/google-chrome-stable';
const mselExe = '/usr/bin/microsoft-edge-stable';

const cw64Exe = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const cw32Exe =
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const msew64Exe = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const msew32Exe =
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const bw64Exe = 'C:\\Program Files\\BraveSoftware\\Brave-Browser\\Application\\brave.exe';

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
  return `C:\\Users\\${user}\\AppData\\Local\\BraveSoftware\\Brave-Browser\\User Data\\Default`
}

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

export default {
  isLinux,
  isWindows,
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
  clProf,
  blProf,
  mseProf,
  cwProf,
  msewProf,
  bwProf,
  isBl,
  isCl,
  isMsel,
  isBw64,
  isCw64,
  isCw32,
  isMsew64,
  isMsew32
};
