package task

type Task struct {
	ID          string   `json:"id" db:"id"`
	Title       string   `json:"title" db:"title"`
	Status      Status   `json:"status" db:"status"`
	Priority    Priority `json:"priority" db:"priority"`
	Description string   `json:"description" db:"description"`
	StartedAt   string   `json:"started_at" db:"started_at"`
	CompletedAt string   `json:"completed_at" db:"completed_at"`
}

type Status string

const (
	StatusTodo Status = "todo"
	StatusDone Status = "done"
)

var Statuses = []struct {
	Value  Status
	TSName string
}{
	{StatusTodo, "todo"},
	{StatusDone, "done"},
}

func (s Status) String() string {
	return string(s)
}

type Priority string

const (
	PriorityLow    Priority = "low"
	PriorityMedium Priority = "medium"
	PriorityHigh   Priority = "high"
)

var Priorities = []struct {
	Value  Priority
	TSName string
}{
	{PriorityLow, "low"},
	{PriorityMedium, "medium"},
	{PriorityHigh, "high"},
}

func (p Priority) String() string {
	return string(p)
}
