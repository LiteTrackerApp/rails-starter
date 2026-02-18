# frozen_string_literal: true

module Api
  class CurrentUserController < ApplicationController
    skip_before_action :authenticate_user!
    skip_before_action :redirect_signed_in_user, raise: false

    def show
      render json: {
        currentUser: user_signed_in? ? current_user_json : nil
      }
    end

    private

    def current_user_json
      {
        name: current_user.name.presence || current_user.email,
        email: current_user.email,
        profilePath: edit_user_path(current_user),
        changePasswordPath: edit_user_registration_path,
        spacesPath: spaces_path,
        setupPath: edit_setup_path,
        adminPath: rails_admin_path,
        logoutPath: destroy_user_session_path,
        avatarUrl: "/avatars/default.jpg",
        multiTenantMode: multi_tenant_mode?,
        isAdmin: current_user.admin?
      }
    end
  end
end
