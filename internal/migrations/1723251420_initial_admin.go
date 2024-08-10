package migrations

import (
	"github.com/pocketbase/dbx"
	"github.com/pocketbase/pocketbase/daos"
	m "github.com/pocketbase/pocketbase/migrations"
	"github.com/pocketbase/pocketbase/models"
)

func init() {
	m.Register(func(db dbx.Builder) error {
		dao := daos.New(db)

		admin := &models.Admin{}

		email := "test@example.com"

		if admin, _ := dao.FindAdminByEmail(email); admin != nil {
			return nil
		}

		admin.Email = email
		admin.SetPassword("1234567890")

		return dao.SaveAdmin(admin)
	}, func(db dbx.Builder) error {
		// add down queries...

		return nil
	})
}
