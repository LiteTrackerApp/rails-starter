# frozen_string_literal: true

module SpaceLayout
  extend ActiveSupport::Concern

  included do
    layout :space_shadcn_layout
  end

  private

  def space_shadcn_layout
    @space&.persisted? ? "space_shadcn" : "application"
  end
end
