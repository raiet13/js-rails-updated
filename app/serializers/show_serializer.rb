class ShowSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :req_recording_hours, :req_age, :show_page_views
  has_many :characters
end