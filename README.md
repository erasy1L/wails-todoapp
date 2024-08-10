# Todo desktop app

This is repository for todo desktop app.

![tasks](https://i.imgur.com/uijx20Q.png)

## Download

You can download the latest version of the app from the [Releases](https://github.com/erazr/wails-todoapp/releases/latest) page. Choose the appropriate file for your operating system.

Prerequisites

- [WebvView2](https://developer.microsoft.com/en-us/microsoft-edge/webview2/)

After installing the prerequisites, place the downloaded wails-todoapp in the newly created folder and run it.

You can open http://127.0.0.1:8080/_/ for pocketbase dashboard UI.

Login with test credentials:
- test@example.com
- 1234567890

![pb login](https://i.imgur.com/MQJsi8q.png)

Dashboard

![pb dashboard](https://i.imgur.com/iruT3m0.png)

## Used libraries

-  [Wails](https://github.com/wailsapp/wails) - main framework

-  [React](https://github.com/facebook/react) - main frontend framework

-  [Pocketbase](https://github.com/pocketbase/pocketbase) - embedded database (SQLite) with dashboard UI

## Manual usage

### Prerequisites

- Go version 1.22.2
- Wails version 2.9.0

run the following command to check if you have the required version of Wails installed:

```
wails doctor
```

Cd into repository folder

### Start in development mode

```
wails dev
```

### Build manually
```
wails build
```

Open http://127.0.0.1:8080/_/ for [pocketbase](https://github.com/pocketbase/pocketbase) dashboard UI

Login with test credentials:
- test@example.com
- 1234567890

## Features

### Adding tasks

![adding tasks](https://i.imgur.com/c1siGHi.png)

### Editing tasks, deleting and changing status(todo/done) of task with checkbox

![editing and changing status](https://i.imgur.com/W32MosH.png)

### Filtering tasks
![todo tasks](https://i.imgur.com/LJOeF88.png)

![done tasks](https://i.imgur.com/jBZ6bfo.png)

### Changing priority
![changing priority](https://i.imgur.com/dhoF9Oe.png)
