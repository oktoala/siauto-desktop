const { app, BrowserWindow, ipcMain } = require("electron");
const os = require("os");
const path = require("path");
const isDev = require("electron-is-dev");
require('@electron/remote/main').initialize();
const puppeteer = require('puppeteer-core');


let win;
function createWindow() {
    win = new BrowserWindow({
        width: 800,
        height: 800,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: true,
        }
    });

    if (os.platform() == 'linux'){
        console.log("Linux")
    }

    win.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`);

}

app.on("ready", createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
});

ipcMain.on('Coba', async (event, arg) => {
    // console.log(arg);
    const result = await scrapeImages(arg);

    win.webContents.send('res', result);
    console.log(result);
});


const scrapeImages = async (mahasiswa) => {
    console.log("haha");
    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/brave',
        userDataDir: '/home/iansyah/.config/BraveSoftware/Brave-Browser/Default',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    const page = await browser.newPage();
    try {
        await page.goto("https://sia.unmul.ac.id/login");
        // ! Login Page

        await page.waitForSelector("input[name=usr]", {
            visible: true,
        }).then(() => console.log("Dapat Input Login"));


        await page.type("input[name=usr]", mahasiswa.nim);

        await page.type("input[name=pwd]", mahasiswa.password);

        const securityCode = await page.evaluate(() => {
            return document.querySelector(".form-group:nth-child(3) > div").innerHTML;
        });

        await page.type("input[name=sc]", securityCode);

        await page.click("button[type=submit]");

        // ? Home Page
        try {
            await page.waitForSelector("h2", {
                visible: true,
                timeout: 5000,
            }).then(() => console.log("Dapat KHS"));
        } catch (error) {
            await browser.close();
            return { response: "NIM dan Password tidak cocok. Silahkan coba lagi", variantAlert: "danger" };
        }

        await page.evaluate(() => {
            // Kartu Hasil Studi
            document.querySelector("li:nth-child(4) > ul > li > a").click();
        });

        // ! KHS Page

        await page.waitForSelector("h5", {
            visible: true,
        });

        const semId = mahasiswa.semId;

        // Send Request according to semester id
        await page.evaluate((semId) => {
            console.log("wkwkwk");
            const http = new XMLHttpRequest();

            http.onreadystatechange = () => {
                if (http.readyState == XMLHttpRequest.DONE) {
                    if (http.status == 200) {
                        document.querySelector("#response").innerHTML = http.response;
                        console.log("hahah");
                    } else {
                        console.log("heheh");
                    }
                }
            };

            http.open("POST", "/pmhskhs/loaddatas", true);
            http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
            http.send(`semId=${semId}`);
        }, semId);

        // Wait for link has been visible

        await page.waitForSelector("#response a", {
            visible: true,
        }).then(() => console.log("Dapat Link"));

        // Get All the link to array

        const data = await page.evaluate(() => {
            const hrefs = document.querySelectorAll("#response a");

            const href = Array.from(hrefs).map((v) => v.getAttribute("href"));

            console.log(`hrefs ${hrefs}`);
            console.log(href);

            return href;
        });

        // Execute every kuesioner

        for await (const link of data) {
            const pageKHS = await browser.newPage();
            await pageKHS.goto(link);

            await pageKHS.waitForSelector("#sipform > div > ul > li > a", {
                visible: true,
            }).then(() => console.log("Udah di kuesioner"));

            // Get All tabs (ex: Kesiapan Mengajar, Materi Pengajaran, ...)
            const tabs = await pageKHS.evaluate(() => {
                const tabs = document.querySelectorAll("#sipform > div > ul > li > a");

                const tabArray = Array.from(tabs).map((v) => v.getAttribute("href"));

                return tabArray;
            });

            // Looping trough the tab
            for await (const tab of tabs) {
                if (tab === "#tabs0") continue;

                await pageKHS.click(`a[href="${tab}"]`);

                // Get all kuesioner in every tabs
                const names = await pageKHS.evaluate((tab) => {
                    document.querySelector(`a[href="${tab}"]`).click();

                    const kuesioners = document.querySelectorAll("tbody tr td:last-child input");

                    const kuesionerArray = Array.from(kuesioners).map((v) => v.getAttribute("name"));

                    return kuesionerArray;
                }, tab);

                // ! Comment this line if youre ready
                if (tab === "#tabs8") {
                    await pageKHS.type("textarea", "✌️");
                    await pageKHS.evaluate(() => {
                        document.querySelector("#submit").click();
                    });
                    continue;
                }

                //* Check Radio button with random number from array nilai
                //* Comment loop below to test submit button button
                // for await (const name of names) {

                //   const randomNumber = mahasiswa.nilai[Math.floor(Math.random() * mahasiswa.nilai.length)];

                //   await pageKHS.evaluate((name: any, randomNumber: string | undefined) => {
                //     (document.querySelector(`input[value="${randomNumber}"][name="${name}"`) as HTMLInputElement).checked = true;

                //   }, name, randomNumber);

                // }
            }

            if (mahasiswa.cobaDulu) {
                break;
            }
        }

        await browser.close();

        return { response: "Berhasil!! Kuesioner Telah diisi 🎉🎉", variantAlert: "success" };
    } catch (e) {
        console.log(`e: ${e}, e.name: ${e.name}`);
        await browser.close();
        if (e.name == "TypeError") {
            return { response: "NIM dan Password tidak cocok. Silahkan coba lagi.", variantAlert: "danger" };
        }
        return { response: "❌Terlalu Lama untuk Request. Mungkin jaringan anda bermasalah. Silahkan Coba lagi ", variantAlert: "danger" };
    }
};
