package task

import (
	"errors"
)

type Request struct {
	Title       string   `json:"title"`
	Status      Status   `json:"status"`
	Priority    Priority `json:"priority"`
	Description string   `json:"description"`
	StartedAt   string   `json:"started_at"`
	CompletedAt string   `json:"completed_at"`
}

func (r *Request) Validate() error {
	if r.Title == "" {
		return errors.New("title can not be empty")
	}

	if r.Description == "" {
		return errors.New("description can not be empty")
	}

	if r.Status != StatusDone && r.Status != StatusTodo {
		return errors.New("incorrect status")
	}

	if r.Priority != PriorityLow && r.Priority != PriorityMedium && r.Priority != PriorityHigh {
		return errors.New("incorrect priority")
	}

	// if _, err := time.Parse("2006-01-02", r.StartedAt); err != nil {
	// 	return errors.New("incorrect started date")
	// }

	// if _, err := time.Parse("2006-01-02", r.CompletedAt); err != nil {
	// 	return errors.New("incorrect started date")
	// }

	return nil
}
