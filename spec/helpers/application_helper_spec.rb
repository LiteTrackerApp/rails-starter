# frozen_string_literal: true

require "rails_helper"

RSpec.describe ApplicationHelper, type: :helper do
  describe "#abbrev_name" do
    it "returns ? for blank name" do
      expect(helper.abbrev_name(nil)).to eq("?")
      expect(helper.abbrev_name("")).to eq("?")
      expect(helper.abbrev_name("   ")).to eq("?")
    end

    it "returns initials separated by dots for full name" do
      expect(helper.abbrev_name("John Doe")).to eq("J.D.")
      expect(helper.abbrev_name("Alice Bob Smith")).to eq("A.B.S.")
    end

    it "returns single initial for one word" do
      expect(helper.abbrev_name("Admin")).to eq("A")
    end
  end

  describe "#roles_page?" do
    it "returns true when controller is spaces/roles and action is index, new, or edit" do
      allow(controller).to receive(:params).and_return("controller" => "spaces/roles", "action" => "index")
      expect(helper.roles_page?).to be true

      allow(controller).to receive(:params).and_return("controller" => "spaces/roles", "action" => "new")
      expect(helper.roles_page?).to be true

      allow(controller).to receive(:params).and_return("controller" => "spaces/roles", "action" => "edit")
      expect(helper.roles_page?).to be true
    end

    it "returns false when controller is not spaces/roles" do
      allow(controller).to receive(:params).and_return("controller" => "spaces/users", "action" => "index")
      expect(helper.roles_page?).to be false
    end

    it "returns false when action is not index, new, or edit" do
      allow(controller).to receive(:params).and_return("controller" => "spaces/roles", "action" => "show")
      expect(helper.roles_page?).to be false
    end
  end

  describe "#space_breadcrumb_title" do
    it "delegates to SpaceBreadcrumbTitle with params controller and action" do
      allow(controller).to receive(:params).and_return("controller" => "spaces/users", "action" => "index")
      allow(SpaceBreadcrumbTitle).to receive(:call).with("spaces/users", "index").and_return("Users")

      expect(helper.space_breadcrumb_title).to eq("Users")
      expect(SpaceBreadcrumbTitle).to have_received(:call).with("spaces/users", "index")
    end
  end

  describe "#space_shadcn_props" do
    before do
      allow(helper).to receive(:controller_path).and_return("spaces")
      allow(helper).to receive(:action_name).and_return("index")
      allow(helper).to receive(:user_signed_in?).and_return(false)
      allow(helper).to receive(:spaces_path).and_return("/spaces")
      allow(helper).to receive(:new_space_path).and_return("/spaces/new")
      allow(helper).to receive(:form_authenticity_token).and_return("token")
    end

    it "returns a hash with spaceName, navPaths, breadcrumbTitle, and other keys for spaces index" do
      result = helper.space_shadcn_props("<p>content</p>")

      expect(result).to include(
        spaceName: "Spaces",
        breadcrumbTitle: "Spaces",
        contentHtml: "<p>content</p>",
        csrfToken: "token",
        currentUser: nil
      )
      expect(result[:navPaths]).to include(:homePath, :setupPath)
      expect(result).to have_key(:spacesPath)
      expect(result).to have_key(:newSpacePath)
      expect(result).to have_key(:spaces)
    end

    it "returns empty hash when variant options are nil (e.g. unknown context, no space)" do
      allow(helper).to receive(:controller_path).and_return("spaces")
      allow(helper).to receive(:action_name).and_return("show")
      helper.instance_variable_set(:@space, nil)

      result = helper.space_shadcn_props("")

      expect(result).to eq({})
    end
  end
end
