# frozen_string_literal: true

require "rails_helper"

RSpec.describe SpaceBreadcrumbTitle do
  describe ".call" do
    it "returns controller-level title when value is a string" do
      expect(described_class.call("spaces/users", "index")).to eq("Users")
      expect(described_class.call("spaces/roles", "new")).to eq("Roles")
      expect(described_class.call("spaces/subscriptions", "index")).to eq("Subscriptions")
    end

    it "returns action-level title when controller value is a hash" do
      expect(described_class.call("spaces", "show")).to eq("Overview")
      expect(described_class.call("spaces", "edit")).to eq("Settings")
      expect(described_class.call("spaces", "update")).to eq("Settings")
      expect(described_class.call("users", "show")).to eq("Overview")
      expect(described_class.call("users", "new")).to eq("New user")
      expect(described_class.call("users", "create")).to eq("New user")
    end

    it "returns humanized action when action not in hash" do
      expect(described_class.call("spaces", "index")).to eq("Index")
      expect(described_class.call("spaces", "destroy")).to eq("Destroy")
    end

    it "returns humanized controller name when controller unknown" do
      expect(described_class.call("spaces/unknown", "index")).to eq("Unknown")
      expect(described_class.call("admin/widgets", "show")).to eq("Widgets")
    end
  end
end
