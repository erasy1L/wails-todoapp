package service

import (
	"context"
	"todo-app/internal/domain/task"
	"todo-app/pkg/log"
)

type TaskService struct {
	repo task.Repository
}

func NewTaskService(repo task.Repository) *TaskService {
	return &TaskService{
		repo: repo,
	}
}

func (h *TaskService) Create(ctx context.Context, req task.Request) (t task.Task, err error) {
	logger := log.LoggerFromContext(ctx)

	req.Validate()

	data := task.Task{
		Title:       req.Title,
		Status:      req.Status,
		Priority:    req.Priority,
		Description: req.Description,
		StartedAt:   req.StartedAt,
		CompletedAt: req.CompletedAt,
	}

	t, err = h.repo.Create(ctx, data)
	if err != nil {
		logger.Err(err).Msg("could not create task")
		return
	}

	return
}

func (h *TaskService) List(ctx context.Context) (tasks []task.Task, err error) {
	logger := log.LoggerFromContext(ctx)

	tasks, err = h.repo.List(ctx)
	if err != nil {
		logger.Err(err).Msg("could not list task")
		return
	}

	return
}

func (h *TaskService) FilterByStatus(ctx context.Context, status task.Status) (tasks []task.Task, err error) {
	logger := log.LoggerFromContext(ctx)

	tasks, err = h.repo.ListByStatus(ctx, status.String())
	if err != nil {
		logger.Err(err).Msg("could not list tasks by status")
		return
	}

	return
}

func (h *TaskService) FilterByPriority(ctx context.Context, priority task.Priority) (tasks []task.Task, err error) {
	logger := log.LoggerFromContext(ctx)

	tasks, err = h.repo.ListByPriority(ctx, priority.String())
	if err != nil {
		logger.Err(err).Msg("could not list tasks by status")
		return
	}

	return
}

func (h *TaskService) Update(ctx context.Context, id string, req task.Request) (err error) {
	logger := log.LoggerFromContext(ctx)

	data := task.Task{
		Title:       req.Title,
		Status:      req.Status,
		Priority:    req.Priority,
		Description: req.Description,
		StartedAt:   req.StartedAt,
		CompletedAt: req.CompletedAt,
	}

	if err = h.repo.Update(ctx, id, data); err != nil {
		logger.Err(err).Msg("could not update task")
		return
	}

	return
}

func (h *TaskService) Delete(ctx context.Context, id string) (err error) {
	logger := log.LoggerFromContext(ctx)

	if err = h.repo.Delete(ctx, id); err != nil {
		logger.Err(err).Msg("could not delete task")
		return
	}

	return
}
