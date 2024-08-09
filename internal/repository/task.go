package repository

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"todo-app/internal/domain/task"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
)

type TaskRepository struct {
	*daos.Dao
}

func NewTaskRepository(db *daos.Dao) *TaskRepository {
	if db == nil {
		panic("db is required")
	}

	return &TaskRepository{
		Dao: db,
	}
}

func (r *TaskRepository) Create(ctx context.Context, data task.Task) (task.Task, error) {
	q := `
		INSERT INTO tasks (id, title, status, priority, description, started_at, completed_at) 
		VALUES ({:id}, {:title}, {:status}, {:priority}, {:description}, {:started_at}, {:completed_at})
	`

	data.ID = r.generateID()

	_, err := r.DB().NewQuery(q).Bind(dbx.Params{
		"id":           data.ID,
		"title":        data.Title,
		"status":       data.Status,
		"priority":     data.Priority,
		"description":  data.Description,
		"started_at":   data.StartedAt,
		"completed_at": data.CompletedAt,
	}).Execute()
	if err != nil {
		return task.Task{}, err
	}

	return data, nil
}

func (r *TaskRepository) List(ctx context.Context) (data []task.Task, err error) {
	q := `
		SELECT * FROM tasks
	`

	data = []task.Task{}

	err = r.DB().NewQuery(q).All(&data)
	if err != nil {
		return
	}

	return
}

func (r *TaskRepository) ListByStatus(ctx context.Context, status string) (data []task.Task, err error) {
	q := `
		SELECT * FROM tasks
		WHERE status = {:status}
	`

	data = []task.Task{}

	err = r.DB().NewQuery(q).Bind(dbx.Params{
		"status": status,
	}).All(&data)
	if err != nil {
		return
	}

	return
}

func (r *TaskRepository) ListByPriority(ctx context.Context, priority string) (data []task.Task, err error) {
	q := `
		SELECT * FROM tasks
		WHERE priority = {:priority}
	`

	data = []task.Task{}

	err = r.DB().NewQuery(q).Bind(dbx.Params{
		"priority": priority,
	}).All(&data)
	if err != nil {
		return
	}

	return
}

func (r *TaskRepository) Delete(ctx context.Context, id string) (err error) {
	q := `
		DELETE FROM tasks
		WHERE id = {:id}
	`

	_, err = r.DB().NewQuery(q).Bind(dbx.Params{
		"id": id,
	}).Execute()
	if err != nil {
		return
	}

	return
}

func (r *TaskRepository) Update(ctx context.Context, id string, data task.Task) (err error) {
	q := `
		UPDATE tasks 
		SET title = {:title}, description = {:description}, priority = {:priority}, status = {:status}, started_at = {:started_at}, completed_at = {:completed_at}
		WHERE id = {:id}
	`

	_, err = r.DB().NewQuery(q).Bind(dbx.Params{
		"id":           id,
		"title":        data.Title,
		"description":  data.Description,
		"priority":     data.Priority,
		"status":       data.Status,
		"started_at":   data.StartedAt,
		"completed_at": data.CompletedAt,
	}).Execute()
	if err != nil {
		return
	}

	return
}

func (r *TaskRepository) MarkAsDone(ctx context.Context, id string) (err error) {
	q := `
		UPDATE tasks 
		SET status = 'done', completed_at = current_timestamp
		WHERE id = {:id}
	`

	_, err = r.DB().NewQuery(q).Bind(dbx.Params{
		"id": id,
	}).Execute()

	if err != nil {
		return
	}

	return
}

func (r *TaskRepository) generateID() string {
	bytes := make([]byte, 12)
	rand.Read(bytes)
	return hex.EncodeToString(bytes)
}
