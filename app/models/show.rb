class Show < ApplicationRecord
  validates_presence_of :name, :req_recording_hours, :req_age
  validates :req_recording_hours, numericality: { less_than_or_equal_to: 200 }

  has_many :recordings
  has_many :users, through: :recordings
  has_many :characters

  # Class scope method
  scope :viewed_shows,   -> { where("show_page_views > 0") }

  def num_recordings
    self.recordings.count
  end
  
  def recording_name
    self.name.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
  end
  
  def self.by_views
    selected = self.select(:name, :id, :show_page_views).order(show_page_views: :desc)
    by_views_array = selected.to_a
    by_views_array.collect do |show|
      self.find(show.id)
    end
  end

end
