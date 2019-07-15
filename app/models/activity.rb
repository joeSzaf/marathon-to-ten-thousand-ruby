class Activity < ApplicationRecord
  validates :name, presence: true
  validates :category, presence: true
  validates :date, presence: true
  validates :duration, presence: true, numericality: { greater_than: 0 }

  belongs_to :user
end
