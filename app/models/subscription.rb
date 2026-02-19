# == Schema Information
#
# Table name: subscriptions
#
#  id         :bigint           not null, primary key
#  end_date   :datetime
#  seats      :integer
#  start_date :datetime         not null
#  plan_id    :bigint           not null
#  space_id   :bigint           not null
#
class Subscription < ApplicationRecord
  belongs_to :space
  belongs_to :plan

  scope :active, -> { where(end_date: nil).or(where("end_date > ?", Date.current)) }

  after_save :refresh_space_active_plan_name
  after_destroy :refresh_space_active_plan_name

  private

  def refresh_space_active_plan_name
    new_name = space.subscriptions.active.includes(:plan).last&.plan&.name || Plan.free_plan&.name
    space.update_column(:active_plan_name, new_name)
  end
end
