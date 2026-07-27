const { app, BrowserWindow, session } = require('electron/main')

// app.commandLine.appendSwitch('enable-unsafe-webgpu');
// app.commandLine.appendSwitch('enable-features', 'WebGPU');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 640,
        height: 480,
        useContentSize: true,
        autoHideMenuBar: true,
        frame: true,  
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,   
//            sandbox: false
        }
    })

    win.webContents.openDevTools();
    win.loadFile('index.html');
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
