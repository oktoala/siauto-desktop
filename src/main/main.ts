/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-restricted-syntax */
/* eslint-disable import/no-named-as-default-member */
/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:main`, this file is compiled to
 * `./src/main.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell, ipcMain } from 'electron';
import os from 'os';
import fs from 'fs';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
// eslint-disable-next-line import/no-named-as-default
// import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';

const puppeteer = require('puppeteer-core');

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

interface DataColleger {
  nim: string;
  password: string;
  semId: string | undefined;
  nilai: (string | undefined)[];
  cobaDulu: boolean;
}

interface DataBrowser {
  browserExe: string[];
  browserProfile: string[];
  browserName: string[];
}

const dataBrowser: DataBrowser = {
  browserExe: [],
  browserProfile: [],
  browserName: [],
};

let mainWindow: BrowserWindow;
let browserExe = 'google-chrome';
let profilDir = '';

ipcMain.on('Open', async () => {
  const browsers = await puppeteer.launch({
    executablePath: browserExe,
    userDataDir: profilDir,
    headless: true,
  });
  browsers.close();
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDevelopment =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDevelopment) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDevelopment) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    resizable: process.env.NODE_ENV !== 'production',
    show: false,
    width: 728,
    height: 700,
    minWidth: 728,
    minHeight: 700,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  mainWindow.setMenu(null);

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  // mainWindow.on('closed', () => {
  //   mainWindow = null;
  // });

  // const menuBuilder = new MenuBuilder(mainWindow);
  // menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();

  const { username } = os.userInfo();
  console.log(`👌 Hallo ${username}`);
  if (os.platform() === 'linux') {
    // Check Google Chrome
    if (fs.existsSync('/usr/bin/google-chrome-stable')) {
      dataBrowser.browserExe.push('/usr/bin/google-chrome-stable');
      dataBrowser.browserProfile.push(
        `/home/${username}/.config/google-chrome/Default`
      );
      dataBrowser.browserName.push('Chrome');
    }
    // Check Brave Browser
    if (fs.existsSync('/usr/bin/brave')) {
      dataBrowser.browserExe.push('/usr/bin/brave');
      dataBrowser.browserProfile.push(
        `/home/${username}/.config/BraveSoftware/Brave-Browser/Default`
      );
      dataBrowser.browserName.push('Brave');
    }
  } else if (os.platform() === 'win32') {
    console.log('Windows');
    // Untuk Chrome 64 bit
    if (
      fs.existsSync(
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
      )
    ) {
      console.log('Memakai Chrome64-bit...');
      browserExe = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
      profilDir = `C:\\Users\\${username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default`;
    }
    // Untuk Chrome 32 bit
    else if (
      fs.existsSync(
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe'
      )
    ) {
      console.log('Memakai Chrome32-bit...');
      browserExe =
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
      profilDir = `C:\\Users\\${username}\\AppData\\Local\\Google\\Chrome\\User Data\\Default`;
    }
    // Untuk Edge 32 bit
    else if (
      fs.existsSync(
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe'
      )
    ) {
      // eslint-disable-next-line prettier/prettier
      browserExe =
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
      profilDir = `C:\\Users\\${username}\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default`;
    }
    // Untuk Edge 64 bit
    else if (
      fs.existsSync(
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe'
      )
    ) {
      // eslint-disable-next-line prettier/prettier
      browserExe =
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
      profilDir = `C:\\Users\\${username}\\AppData\\Local\\Microsoft\\Edge\\User Data\\Default`;
    }
  }
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

const scrapeImages = async (mahasiswa: DataColleger) => {
  const browser = await puppeteer.launch({
    executablePath: dataBrowser.browserExe[0],
    userDataDir: profilDir,
    headless: true,
  });
  const page = await browser.newPage();

  try {
    await page.goto('https://sia.unmul.ac.id/login', {
      waituntil: 'load',
      timeout: 100000,
    });
    // ! Login Page

    await page
      .waitForSelector('input[name=usr]', {
        visible: true,
      })
      .then(() => console.log('Dapat Input Login'));

    await page.type('input[name=usr]', mahasiswa.nim);

    await page.type('input[name=pwd]', mahasiswa.password);

    const securityCode = await page.evaluate(() => {
      return (
        document.querySelector('.form-group:nth-child(3) > div') as HTMLElement
      ).innerHTML;
    });

    await page.type('input[name=sc]', securityCode);

    await page.click('button[type=submit]');

    // ? Home Page
    try {
      await page
        .waitForSelector('h2', {
          visible: true,
          timeout: 5000,
        })
        .then(() => console.log('Dapat KHS'));
    } catch (error) {
      return {
        response: 'NIM dan Password tidak cocok. Silahkan coba lagi',
        variantAlert: 'danger',
      };
    }

    await page.evaluate(() => {
      // Kartu Hasil Studi
      (
        document.querySelector('li:nth-child(4) > ul > li > a') as HTMLElement
      ).click();
    });

    // ! KHS Page

    await page.waitForSelector('h5', {
      visible: true,
    });

    const { semId } = mahasiswa;

    // Send Request according to semester id
    // eslint-disable-next-line @typescript-eslint/no-shadow
    await page.evaluate((semId: string) => {
      console.log('wkwkwk');
      const http = new XMLHttpRequest();

      http.onreadystatechange = () => {
        if (http.readyState === XMLHttpRequest.DONE) {
          if (http.status === 200) {
            (document.querySelector('#response') as HTMLElement).innerHTML =
              http.response;
            console.log('hahah');
          } else {
            console.log('heheh');
          }
        }
      };

      http.open('POST', '/pmhskhs/loaddatas', true);
      http.setRequestHeader(
        'Content-Type',
        'application/x-www-form-urlencoded; charset=UTF-8'
      );
      http.send(`semId=${semId}`);
    }, semId);

    // Wait for link has been visible

    await page
      .waitForSelector('#response a', {
        visible: true,
      })
      .then(() => console.log('Dapat Link'));

    // Get All the link to array
    const data = await page.evaluate(() => {
      const hrefs = document.querySelectorAll('#response a');

      const href = Array.from(hrefs).map((v) => v.getAttribute('href'));

      console.log(`hrefs ${hrefs}`);
      console.log(href);

      return href;
    });

    // Execute every kuesioner

    for await (const link of data) {
      const pageKHS = await browser.newPage();
      await pageKHS.goto(link);

      await pageKHS
        .waitForSelector('#sipform > div > ul > li > a', {
          visible: true,
        })
        .then(() => console.log('Udah di kuesioner'));

      // Get All tabs (ex: Kesiapan Mengajar, Materi Pengajaran, ...)
      const tabs = await pageKHS.evaluate(() => {
        const tabes = document.querySelectorAll('#sipform > div > ul > li > a');

        const tabArray = Array.from(tabes).map((v) => v.getAttribute('href'));

        return tabArray;
      });

      // Looping trough the tab
      for await (const tab of tabs) {
        // eslint-disable-next-line no-continue
        if (tab === '#tabs0') continue;

        await pageKHS.click(`a[href="${tab}"]`);

        // Get all kuesioner in every tabs
        const names = await pageKHS.evaluate((tabtab: any) => {
          (
            document.querySelector(`a[href="${tabtab}"]`) as HTMLElement
          ).click();

          const kuesioners = document.querySelectorAll(
            'tbody tr td:last-child input'
          );

          const kuesionerArray = Array.from(kuesioners).map((v) =>
            v.getAttribute('name')
          );

          return kuesionerArray;
        }, tab);

        // ! Comment this line if youre ready
        if (tab === '#tabs8') {
          await pageKHS.type('textarea', '✌️');
          console.log(typeof names);
          const buttonSubmit = await pageKHS.evaluate(() => {
            if (process.env.NODE_ENV === 'production') {
              (document.querySelector('#submit') as HTMLElement).click();
            }
            console.log('Submit');
            return 'Makan';
          });
          console.log(buttonSubmit);
          // eslint-disable-next-line no-continue
          continue;
        }
        //* Check Radio button with random number from array nilai
        //* Comment loop below to test submit button button
        // eslint-disable-next-line no-restricted-syntax
        for await (const name of names) {
          const randomNumber =
            mahasiswa.nilai[Math.floor(Math.random() * mahasiswa.nilai.length)];

          await pageKHS.evaluate(
            (namename: unknown, randomNumbers: string | undefined) => {
              (
                document.querySelector(
                  `input[value="${randomNumbers}"][name="${namename}"`
                ) as HTMLInputElement
              ).checked = true;
            },
            name,
            randomNumber
          );
        }
      }

      if (mahasiswa.cobaDulu) {
        break;
      }
    }

    // await page.close();
    // await pageKHS.close();
    // await browser.close();

    return {
      response: 'Berhasil!! Kuesioner Telah diisi 🎉🎉',
      variantAlert: 'success',
    };
  } catch (e: any) {
    console.log(`e: ${e}, e.name: ${e.name}`);
    if (e.name === 'TypeError') {
      return {
        response: 'NIM dan Password tidak cocok. Silahkan coba lagi.',
        variantAlert: 'danger',
      };
    }
    return {
      response:
        '❌Terlalu Lama untuk Request. Mungkin jaringan anda bermasalah. Silahkan Coba lagi ',
      variantAlert: 'danger',
    };
  }
};

ipcMain.on('Coba', async (_event, arg) => {
  console.log(arg);
  const result = await scrapeImages(arg);

  mainWindow.webContents.send('res', result);
  console.log(result);
});

ipcMain.on('GetBrowser', async (_event, arg) => {
  console.log(arg);
  mainWindow.webContents.send('Browser', dataBrowser);
});
