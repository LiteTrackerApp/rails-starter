# frozen_string_literal: true

class AddUsersCountToSpaces < ActiveRecord::Migration[8.1]
  def up
    add_column :spaces, :users_count, :integer, default: 0, null: false
    # Backfill from current user_roles count per space
    execute <<-SQL.squish
      UPDATE spaces
      SET users_count = (
        SELECT COUNT(DISTINCT user_id) FROM user_roles WHERE user_roles.space_id = spaces.id
      )
    SQL
  end

  def down
    remove_column :spaces, :users_count
  end
end
