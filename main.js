const electron = require("electron");
const url = require("url");
const path = require("path");

const { app, BrowserWindow, Menu, ipcMain } = electron;

// Global reference to mainWindow
let mainWindow;
let invisibleWindow;

app.on("ready", function () {
    // Create new window
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
    });
    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "main.html"),
            protocol: "file:",
            slashes: true,
        })
    );

    // Creating the Menu
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);
});

function createInvisibleWindow() {
    invisibleWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        show: false,
    });

    invisibleWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, "invisible.html"),
            protocol: "file:",
            slashes: true,
        })
    );
}

ipcMain.on("generate-random-number", function (event) {
    createInvisibleWindow();
});

ipcMain.on("random-number", function (event, number) {
    mainWindow.webContents.send("random-number", number);
    invisibleWindow.close();
});

// Create menu template
const mainMenuTemplate = [
    {
        label: "Options",
        submenu: [
            {
                label: "Toggle DevTools",
                accelerator: "CmdOrCtrl+I",
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.toggleDevTools();
                    }
                },
            },
            {
                label: "Force Reload",
                accelerator: "CmdOrCtrl+R",
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.reload();
                    }
                },
            },
            {
                label: "Quit",
                accelerator: "CmdOrCtrl+Q",
                click: function (item, focusedWindow) {
                    if (focusedWindow) {
                        focusedWindow.close();
                    }
                },
            },
        ],
    },
];
