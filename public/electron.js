const { app, BrowserWindow } = require("electron");
const path = require("path");

let mainWindow;

function createWindow() {
	mainWindow = new BrowserWindow({
		minWidth: 900,
		minHeight: 680,
		webPreferences: {
			nodeIntegration: true,
		},
		icon: path.join(__dirname, "logo512.png"),
		autoHideMenuBar: true,
	});
	mainWindow.loadURL(`file://${path.join(__dirname, "../build/index.html")}`);
	mainWindow.on("closed", () => (mainWindow = null));
}

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (mainWindow === null) {
		createWindow();
	}
});

// In the above code, we are creating a new BrowserWindow instance and loading the index.html file from the build folder. If the app is in development mode, we are loading the React app from localhost:3000. We are also setting the nodeIntegration property to true in the webPreferences object to enable Node.js integration in the renderer process.

// Now, let’s update the package.json file to add the electron command to start the Electron app.

// Path: package.json
