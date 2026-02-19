# frozen_string_literal: true

module SpaceLayout
  extend ActiveSupport::Concern

  included do
    layout :space_shadcn_layout
  end

  private

  def space_shadcn_layout
    return "space_shadcn" if controller_name == "spaces" && (action_name == "index" || @space&.persisted?)
    "application"
  end
end
