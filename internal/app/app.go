package app

import (
	"context"
	"todo-app/internal/domain/task"
	"todo-app/internal/repository"
	"todo-app/internal/service"
	"todo-app/pkg/log"

	"github.com/pocketbase/pocketbase"
	"github.com/pocketbase/pocketbase/apis"
	"github.com/pocketbase/pocketbase/daos"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/plugins/migratecmd"
)

type App struct {
	ctx context.Context

	taskService *service.TaskService
}

func NewApp() *App {
	logger := log.LoggerFromContext(context.Background())

	pb := pocketbase.New()

	migratecmd.MustRegister(pb, pb.RootCmd, migratecmd.Config{})

	if err := pb.Bootstrap(); err != nil {
		logger.Fatal().Msg("could not bootstrap pocketbase")
		return nil
	}

	taskRepository := repository.NewTaskRepository(pb.Dao())
	taskService := service.NewTaskService(taskRepository)

	if err := createInitialAdmin(pb.Dao()); err != nil {
		logger.Err(err).Msg("could not create initial admin")
	}

	go func() {
		_, err := apis.Serve(pb, apis.ServeConfig{
			HttpAddr:        "127.0.0.1:8080",
			ShowStartBanner: true,
		})

		if err != nil {
			logger.Err(err).Msg("could not start pocketbase")
		}
	}()

	return &App{
		taskService: taskService,
	}
}

func (a *App) Run(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) CreateTask(req task.Request) (task.Task, error) {
	return a.taskService.Create(a.ctx, req)
}

func (a *App) ListTasks() ([]task.Task, error) {
	return a.taskService.List(a.ctx)
}

func (a *App) FilterTasksByStatus(status task.Status) ([]task.Task, error) {
	return a.taskService.FilterByStatus(a.ctx, status)
}

func (a *App) FilterTasksByPriority(priority task.Priority) ([]task.Task, error) {
	return a.taskService.FilterByPriority(a.ctx, priority)
}

func (a *App) UpdateTask(id string, req task.Request) error {
	return a.taskService.Update(a.ctx, id, req)
}

func (a *App) DeleteTask(id string) error {
	return a.taskService.Delete(a.ctx, id)
}

func createInitialAdmin(dao *daos.Dao) error {
	admin := &models.Admin{}

	email := "test@example.com"

	if admin, _ := dao.FindAdminByEmail(email); admin != nil {
		return nil
	}

	admin.Email = email
	admin.SetPassword("1234567890")

	return dao.SaveAdmin(admin)
}