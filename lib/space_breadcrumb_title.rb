# frozen_string_literal: true

# Resolves the breadcrumb title for the space layout from controller and action.
# No view or route dependencies—easy to unit test.
class SpaceBreadcrumbTitle
  TITLES = {
    "spaces" => { "show" => "Overview", "edit" => "Settings", "update" => "Settings" },
    "users"  => { "show" => "Overview", "edit" => "Settings", "update" => "Settings", "new" => "New user", "create" => "New user" },
    "spaces/users"          => "Users",
    "spaces/roles"          => "Roles",
    "spaces/subscriptions" => "Subscriptions",
  }.freeze

  def self.call(controller, action)
    new(controller, action).call
  end

  def initialize(controller, action)
    @controller = controller
    @action = action
  end

  def call
    value = TITLES[@controller]
    title = case value
    when String then value
    when Hash then value[@action]
    else nil
    end
    title || @controller.split("/").last.humanize
  end
end
