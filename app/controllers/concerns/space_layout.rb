# frozen_string_literal: true

# Chooses the space sidebar layout for space-related and profile controllers.
# Included by SpacesController, Spaces::*, and UsersController.
module SpaceLayout
  extend ActiveSupport::Concern

  LAYOUT_SIDEBAR = "space_shadcn"
  LAYOUT_DEFAULT = "application"
  SPACES_SCOPE   = "spaces"
  PROFILE_SCOPE  = "users"
  # SpacesController actions that use sidebar without a persisted @space
  SPACES_ACTIONS_WITHOUT_SPACE = %w[index new]

  included do
    layout :space_shadcn_layout
  end

  private

  def space_shadcn_layout
    use_space_sidebar_layout? ? LAYOUT_SIDEBAR : LAYOUT_DEFAULT
  end

  def use_space_sidebar_layout?
    space_sub_controller? || profile_controller? || spaces_controller_with_sidebar?
  end

  def space_sub_controller?
    controller_path.start_with?("#{SPACES_SCOPE}/")
  end

  def profile_controller?
    controller_path == PROFILE_SCOPE
  end

  def spaces_controller_with_sidebar?
    return false unless controller_path == SPACES_SCOPE

    action_name.in?(SPACES_ACTIONS_WITHOUT_SPACE) || @space&.persisted?
  end
end
