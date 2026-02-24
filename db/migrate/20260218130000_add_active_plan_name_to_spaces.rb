# frozen_string_literal: true

class AddActivePlanNameToSpaces < ActiveRecord::Migration[8.1]
  def up
    add_column :spaces, :active_plan_name, :string
    # Backfill from current active subscription per space
    date = connection.quote(Date.current)
    execute <<-SQL.squish
      UPDATE spaces
      SET active_plan_name = (
        SELECT plans.name
        FROM subscriptions
        INNER JOIN plans ON plans.id = subscriptions.plan_id
        WHERE subscriptions.space_id = spaces.id
          AND (subscriptions.end_date IS NULL OR subscriptions.end_date > #{date})
        ORDER BY subscriptions.start_date DESC
        LIMIT 1
      )
    SQL
  end

  def down
    remove_column :spaces, :active_plan_name
  end
end
