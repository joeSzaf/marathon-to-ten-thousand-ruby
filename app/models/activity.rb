class Airport < ApplicationRecord
  validates :name, presence: true
  validates :type, presence: true
  validates :date, presence: true
  validates :duration, presence: true

  belongs_to :user
end
