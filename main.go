package main

import (
	"context"
	"embed"
	"todo-app/internal/app"
	"todo-app/internal/domain/task"
	"todo-app/pkg/log"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	logger := log.LoggerFromContext(context.Background())

	app := app.NewApp()

	err := wails.Run(&options.App{
		Title:  "todo-app",
		Width:  1024,
		Height: 1024,
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		BackgroundColour: options.NewRGB(255, 255, 255),
		OnStartup:        app.Run,
		Bind: []interface{}{
			app,
		},
		EnumBind: []interface{}{
			task.Statuses,
			task.Priorities,
		},
	})

	if err != nil {
		logger.Err(err).Msg("wails could not start")
		return
	}
}
