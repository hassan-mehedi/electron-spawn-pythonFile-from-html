# electron-spawn-pythonFile-from-html

## Things you need to know before going to the codebase:
1. What is electron?
2. What is main process?
3. What is a child process?
4. How should the data flow between main and child process?
5. Keywords: ipc, ipcMain, ipcRenderer, Menu, BrowserWindow

## Trying out some features related to electron: 
1. You can use require('package-name') if you set nodeIntegration:true in the webPreferences(main.js)
2. You can spawn or run python file using a package call python-shell 
3. In this code you can see I pass a number to the python script and it returns me the factorial of that number
4. You can spawn as many processes as you want
5. You can create an invisible window and run a python script from that window
6. Exchange data between two child process via main process by using ipcMain and ipcRenderer
