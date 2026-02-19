# frozen_string_literal: true

module ApplicationHelper
  include SettingsHelper

  def render_flash_stream
    turbo_stream.update "flash", partial: "common/flash"
  end

  def nav_bar(&)
    content_tag(:ul, class: "navbar-nav", &)
  end

  def nav_link(path, &)
    options = current_page?(path) ? { class: "nav-item active" } : { class: "nav-item" }
    content_tag(:li, options) do
      link_to(path, class: "nav-link", &)
    end
  end

  def settings_nav_link(&)
    options = current_page?(edit_space_path(@space)) || roles_page? ? { class: "nav-item active" } : { class: "nav-item" }
    content_tag(:li, options) do
      link_to(edit_space_path(@space), class: "nav-link", &)
    end
  end

  def roles_page?
    controller = "spaces/roles"
    actions = %w[index new edit]
    actions.any? { |action| params[:controller] == controller && params[:action] == action }
  end

  def user_spaces
    @user_spaces ||= current_user.spaces.order(:name).filter(&:active?)
  end

  def abbrev_name(name)
    name.blank? ? "?" : name.split.map(&:first).join(".")
  end

  def demo_mode?
    App::Config.app.demo_mode
  end

  def space_shadcn_props(content_html = "")
    # Spaces index: no @space but we render the list inside space_shadcn layout
    if controller_name == "spaces" && action_name == "index"
      return space_shadcn_index_props(content_html)
    end
    return {} unless defined?(@space) && @space

    props = {
      spaceName: @space.name,
      spacesPath: spaces_path,
      newSpacePath: new_space_path,
      navPaths: {
        homePath: space_path(@space),
        usersPath: space_users_path(@space),
        settingsPath: edit_space_path(@space),
        rolesPath: space_roles_path(@space),
        subscriptionsPath: space_subscriptions_path(@space),
      },
      breadcrumbTitle: space_breadcrumb_title,
      contentHtml: content_html,
      csrfToken: form_authenticity_token,
    }

    if user_signed_in?
      props[:currentUser] = {
        name: current_user.name.presence || current_user.email,
        email: current_user.email,
        profilePath: edit_user_path(current_user),
        changePasswordPath: edit_user_registration_path,
        spacesPath: spaces_path,
        newSpacePath: new_space_path,
        setupPath: edit_setup_path,
        adminPath: rails_admin_path,
        logoutPath: destroy_user_session_path,
        avatarUrl: "/avatars/default.jpg",
        multiTenantMode: multi_tenant_mode?,
        isAdmin: current_user.admin?,
      }
    else
      props[:currentUser] = nil
    end

    props
  end

  def space_shadcn_index_props(content_html)
    {
      spaceName: "Spaces",
      spacesPath: spaces_path,
      newSpacePath: new_space_path,
      navPaths: { homePath: spaces_path },
      breadcrumbTitle: "Spaces",
      contentHtml: content_html,
      csrfToken: form_authenticity_token,
    }.merge(user_signed_in? ? {
      currentUser: {
        name: current_user.name.presence || current_user.email,
        email: current_user.email,
        profilePath: edit_user_path(current_user),
        changePasswordPath: edit_user_registration_path,
        spacesPath: spaces_path,
        newSpacePath: new_space_path,
        setupPath: edit_setup_path,
        adminPath: rails_admin_path,
        logoutPath: destroy_user_session_path,
        avatarUrl: "/avatars/default.jpg",
        multiTenantMode: multi_tenant_mode?,
        isAdmin: current_user.admin?,
      },
    } : { currentUser: nil })
  end

  def space_breadcrumb_title
    case params[:controller]
    when "spaces"
      case params[:action]
      when "show" then "Overview"
      when "edit", "update" then "Settings"
      else params[:action].humanize
      end
    when "spaces/users" then "Users"
    when "spaces/roles" then "Roles"
    when "spaces/subscriptions" then "Subscriptions"
    else params[:controller].split("/").last.humanize
    end
  end

  def inline_svg(path, options = {})
    file = File.read(Rails.root.join("app", "assets", "images", path))
    doc = Nokogiri::HTML::DocumentFragment.parse(file)
    svg = doc.at_css "svg"

    options.each { |key, value| svg[key.to_s] = value } if options.present?

    doc.to_html.html_safe
  end
end
