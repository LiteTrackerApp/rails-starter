# frozen_string_literal: true

class ChangeRolesPermissionsToJsonb < ActiveRecord::Migration[8.1]
  def up
    return unless column_exists?(:roles, :permissions)

    change_column :roles, :permissions, :jsonb, default: "{}", null: false
  end

  def down
    return unless column_exists?(:roles, :permissions)

    change_column :roles, :permissions, :json, default: "{}", null: false
  end
end
