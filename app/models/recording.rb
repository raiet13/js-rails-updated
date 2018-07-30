class Recording < ApplicationRecord
  belongs_to :user
  belongs_to :show
  validates :name, presence: true, uniqueness: true
  

  # Main method for checking
  def check_recording
    set_variables
    @notice = ""
    if !check_hours && !check_age
      @notice = "You are not old enough and do not have enough hours to record this show."
    elsif !check_hours
      @notice = "You do not have enough hours to record this show."
    elsif !check_age
      @notice = "You are not old enough to record this show."
    end
    @notice
  end

  # Toggle active
  def active_toggle!
    set_variables
    check_hours
    update active: !active
  end




  ## Methods for allowing recording or not ##
  private

  def set_variables
    @rec_show = self.show
    @recorder = self.user
  end

  # Check user has enough hours to record show
  def check_hours
    if @recorder.current_recording_hours >= @rec_show.req_recording_hours
      return true
    end
    false
  end

  # Check user is old enough to record show
  def check_age
    if @recorder.age >= @rec_show.req_age
      return true
    end
    false
  end

end
