class RecordingsController < ApplicationController
  before_action :redirect_if_not_logged_in

  # Show all existing recordings belonging to user or all period
  def index
    if params[:format]
      @recordings_user = User.find(params[:format])
      @recordings = @recordings_user.all_recordings
    else
      @recordings = Recording.all
    end
  end

  # Create new recording
  def new
    @show = Show.find(params[:format])
    @recording = Recording.new
    @recording.name = current_user.name + "_" + @show.recording_name
  end

  # Be able to create/set a recording
  def create
    recording = Recording.new(recordings_params(:name, :user_id, :show_id))

    if recording.check_recording == ""
      if recording.save
        flash[:notice] = ""
        redirect_to recordings_path(current_user)
      else
        flash[:notice] = "Something went wrong during recording creation, please try again."
        @show = recording.show
        @recording = recording
  			render :new
			end
    else
      flash[:notice] = recording.check_recording
      show = Show.find(params[:recording][:show_id])
      redirect_to show_path(show)
    end
  end
  
  def edit
    @recording = Recording.find(params[:id])
  end

  # Be able to update whether a recording is active or "deleted" (inactive)
  def update
    puts "Record update params = #{params}"
    recording = Recording.find(params[:id])
    if params.include?(:recording)
      if recording.update(recordings_params(:name, :active))
        redirect_to recordings_path(current_user)
      else
        @recording = recording
        render :edit
      end
    else
      recording.active_toggle!
      redirect_to recordings_path(current_user)
    end
  end

  private

  def recordings_params(*args)
    params.require(:recording).permit(*args)
  end

end
