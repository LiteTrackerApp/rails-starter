# frozen_string_literal: true

class DemoController < ApplicationController
  skip_before_action :authenticate_user!, only: [ :shadcn ]
  layout "shadcn", only: [ :shadcn ]

  def shadcn; end
end
