package migrations

import (
	"context"
	"errors"
	"todo-app/internal/domain/task"
	"todo-app/pkg/log"

	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
	"github.com/pocketbase/pocketbase/models/schema"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		var (
			maxDescriptionLength int    = 100
			collName             string = "tasks"
		)

		logger := log.LoggerFromContext(context.Background())

		dao := daos.New(db)

		if coll, _ := dao.FindCollectionByNameOrId(collName); coll != nil {
			logger.Error().Msg("tasks table exists")
			return errors.New("tasks table exists")
		}

		coll := models.Collection{}
		coll.Name = collName
		coll.Type = models.CollectionTypeBase
		coll.ListRule = nil
		coll.ViewRule = nil
		coll.CreateRule = nil
		coll.UpdateRule = nil
		coll.DeleteRule = nil
		coll.Schema.AddField(&schema.SchemaField{
			Name:     "title",
			Type:     schema.FieldTypeText,
			Required: true,
		})
		coll.Schema.AddField(&schema.SchemaField{
			Name:     "status",
			Type:     schema.FieldTypeSelect,
			Required: true,
			Options: &schema.SelectOptions{
				Values: []string{
					string(task.StatusTodo),
					string(task.StatusDone),
				},
				MaxSelect: 1,
			},
		})
		coll.Schema.AddField(&schema.SchemaField{
			Name:     "priority",
			Type:     schema.FieldTypeSelect,
			Required: true,
			Options: &schema.SelectOptions{
				Values: []string{
					string(task.PriorityLow),
					string(task.PriorityMedium),
					string(task.PriorityHigh),
				},
				MaxSelect: 1,
			},
		})
		coll.Schema.AddField(&schema.SchemaField{
			Name:     "description",
			Type:     schema.FieldTypeText,
			Required: true,
			Options: &schema.TextOptions{
				Max: &maxDescriptionLength,
			},
		})
		coll.Schema.AddField(&schema.SchemaField{
			Name:     "started_at",
			Type:     schema.FieldTypeDate,
			Required: true,
		})
		coll.Schema.AddField(&schema.SchemaField{
			Name:     "completed_at",
			Type:     schema.FieldTypeDate,
			Required: false,
		})

		coll.Indexes = append(coll.Indexes,
			"CREATE INDEX idx_tasks_status on tasks (status)",
			"CREATE INDEX idx_tasks_priority on tasks (priority)",
		)

		return dao.SaveCollection(&coll)
	}, func(db dbx.Builder) error {
		// add down queries...

		return nil
	})
}
