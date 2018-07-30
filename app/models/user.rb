class User < ApplicationRecord
  has_secure_password
  validates_presence_of :name
  validates_presence_of :password, confirmation: true, :on => :create
  validates :password_confirmation, presence: true, :on => :create

  validates :username, presence: true, uniqueness: true
  validates :total_recording_hours, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 200 }
  validates :age, numericality: { greater_than_or_equal_to: 0, less_than_or_equal_to: 200 }

  has_many :recordings
  has_many :shows, through: :recordings

  # User's current number of active recordings
  def active_recordings
    self.recordings.where(active: true)
  end

  # List of all recordings that user has created
  def all_recordings
    self.recordings
  end
  
  def num_active_recordings
    self.active_recordings.count
  end
  
  def num_recordings
    self.all_recordings.count
  end
  
  def user_has_show(show)
    check_show = self.shows.include?(show)
    if check_show
     return show
    end
  end
  
  def user_recording_show(show)
    current = self.active_recordings.to_a
    check = current.collect do |recording|
      Show.find(recording.show.id)
    end
    if check.include?(show)
      return show
    end
  end

  def current_recording_hours
    current_hours = 0
    self.active_recordings.each do |rec|
      current_hours += rec.show.req_recording_hours
    end
    self.total_recording_hours - current_hours
  end
  
end
