package task

import "context"

type Repository interface {
	Create(context.Context, Task) (Task, error)
	List(ctx context.Context) ([]Task, error)
	ListByStatus(ctx context.Context, status string) ([]Task, error)
	ListByPriority(ctx context.Context, priority string) ([]Task, error)
	Delete(ctx context.Context, id string) error
	Update(ctx context.Context, id string, data Task) error
}
