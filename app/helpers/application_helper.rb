# frozen_string_literal: true

module ApplicationHelper
  include SettingsHelper

  # Controller paths (align with SpaceLayout concern)
  CONTROLLER_PATH_SPACES = "spaces"
  CONTROLLER_PATH_USERS  = "users"
  ROLES_CONTROLLER      = "spaces/roles"
  ROLES_PAGE_ACTIONS    = %w[index new edit]
  SPACES_LIST_LIMIT     = 50
  DEFAULT_AVATAR_URL    = "/avatars/default.jpg"

  # Breadcrumb title lookup: [controller] or [controller, action] => title
  BREADCRUMB_TITLES = {
    CONTROLLER_PATH_SPACES => { "show" => "Overview", "edit" => "Settings", "update" => "Settings" },
    CONTROLLER_PATH_USERS  => { "show" => "Overview", "edit" => "Settings", "update" => "Settings", "new" => "New user", "create" => "New user" },
    "spaces/users"         => "Users",
    ROLES_CONTROLLER      => "Roles",
    "spaces/subscriptions" => "Subscriptions",
  }.freeze

  def render_flash_stream
    turbo_stream.update "flash", partial: "common/flash"
  end

  def nav_bar(&)
    content_tag(:ul, class: "navbar-nav", &)
  end

  def nav_link(path, &)
    options = current_page?(path) ? { class: "nav-item active" } : { class: "nav-item" }
    content_tag(:li, options) { link_to(path, class: "nav-link", &) }
  end

  def settings_nav_link(&)
    active = current_page?(edit_space_path(@space)) || roles_page?
    options = { class: "nav-item#{' active' if active}" }
    content_tag(:li, options) { link_to(edit_space_path(@space), class: "nav-link", &) }
  end

  def roles_page?
    params[:controller] == ROLES_CONTROLLER && params[:action].in?(ROLES_PAGE_ACTIONS)
  end

  def user_spaces
    @user_spaces ||= current_user.spaces.order(:name).filter(&:active?)
  end

  def space_shadcn_spaces_list
    return [] unless user_signed_in?

    current_user.spaces.order(:name).limit(SPACES_LIST_LIMIT).map do |s|
      { id: s.id, name: s.name, path: space_path(s) }
    end
  end

  def abbrev_name(name)
    name.blank? ? "?" : name.split.map(&:first).join(".")
  end

  def demo_mode?
    App::Config.app.demo_mode
  end

  # Entry point for space_shadcn layout (called from layout). Returns props for the React root.
  def space_shadcn_props(content_html = "")
    opts = space_shadcn_variant_options
    return {} if opts.nil?

    space_shadcn_build_props(content_html, **opts)
  end

  def space_breadcrumb_title
    ctrl, action = params[:controller], params[:action]
    title = BREADCRUMB_TITLES.dig(ctrl, action) || (BREADCRUMB_TITLES[ctrl] if BREADCRUMB_TITLES[ctrl].is_a?(String))
    title || ctrl.split("/").last.humanize
  end

  def inline_svg(path, options = {})
    file = File.read(Rails.root.join("app", "assets", "images", path))
    doc = Nokogiri::HTML::DocumentFragment.parse(file)
    svg = doc.at_css("svg")
    options.each { |key, value| svg[key.to_s] = value } if options.present?
    doc.to_html.html_safe
  end

  private

  # Returns option hash for current request, or nil when no layout (e.g. no @space).
  def space_shadcn_variant_options
    case [ controller_path, action_name ]
    in [ CONTROLLER_PATH_SPACES, "index" ]
      { spaceName: "Spaces", navPaths: space_shadcn_nav_paths(nil), breadcrumbTitle: "Spaces" }
    in [ CONTROLLER_PATH_SPACES, "new" ]
      { spaceName: "New space", navPaths: space_shadcn_nav_paths(nil), breadcrumbTitle: "New" }
    in [ CONTROLLER_PATH_USERS, _ ]
      { spaceName: "User", navPaths: { homePath: user_signed_in? ? edit_user_path(current_user) : root_path }, breadcrumbTitle: space_breadcrumb_title }
    else
      return nil unless defined?(@space) && @space&.persisted?
      { spaceName: @space.name, navPaths: space_shadcn_nav_paths(@space), breadcrumbTitle: space_breadcrumb_title }
    end
  end

  def space_shadcn_build_props(content_html, spaceName:, navPaths:, breadcrumbTitle:)
    {
      spaceName:,
      spacesPath: spaces_path,
      newSpacePath: new_space_path,
      spaces: space_shadcn_spaces_list,
      navPaths:,
      breadcrumbTitle:,
      contentHtml: content_html,
      csrfToken: form_authenticity_token,
      currentUser: space_shadcn_current_user_props,
    }
  end

  def space_shadcn_nav_paths(space)
    if space&.persisted?
      {
        homePath: space_path(space),
        usersPath: space_users_path(space),
        settingsPath: edit_space_path(space),
        rolesPath: space_roles_path(space),
        subscriptionsPath: space_subscriptions_path(space),
        setupPath: edit_setup_path,
      }
    else
      { homePath: spaces_path, setupPath: edit_setup_path }
    end
  end

  def space_shadcn_current_user_props
    return nil unless user_signed_in?

    {
      name: current_user.name.presence || current_user.email,
      email: current_user.email,
      profilePath: edit_user_path(current_user),
      changePasswordPath: edit_user_registration_path,
      spacesPath: spaces_path,
      newSpacePath: new_space_path,
      setupPath: edit_setup_path,
      adminPath: rails_admin_path,
      logoutPath: destroy_user_session_path,
      avatarUrl: DEFAULT_AVATAR_URL,
      multiTenantMode: multi_tenant_mode?,
      isAdmin: current_user.admin?,
    }
  end
end
