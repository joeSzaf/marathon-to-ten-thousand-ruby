class ActivitySerializer < ActiveModel::Serializer
  attributes :id, :name, :category, :date, :duration, :note
end
