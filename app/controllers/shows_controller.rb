class ShowsController < ApplicationController
  before_action :redirect_if_not_logged_in
  before_action :check_user_recorded_show, only: [:edit, :update, :destroy]
  # skip_before_action :check_user_recorded_show, only: [:index, :new, :create, :show, :most_viewed, :viewed_shows
  # ]

  # Show all shows -- updated for JS
  def index
    @shows = Show.all
    respond_to do |format|
      format.html { render :index }
      format.json { render json: @shows, status: 200}
    end
  end

  # New Show
  def new
    @show = Show.new
  end

  # Create only if show doesn't exist
  def create
    show = Show.find_by(name: params[:name])
    if show
      flash[:notice] = "The show you attempted to create already exists."
      redirect_to show_path(show)
    else
      new_show = Show.new(show_params)
      if new_show.save
        flash[:notice] = ""
        render json: new_show, status: 201
      else
        flash[:notice] = "Something went wrong during show creation, please try again."
        @show = new_show
  			render :new
      end
    end
  end

  # Show Profile
  def show
    @show = Show.find(params[:id])
    @show.show_page_views += 1
    @show.save
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @show, status: 200}
    end
  end

  # Edit Show if User has recorded it
  def edit
    @show = Show.find(params[:id])
  end

  def update
    show = Show.find(params[:id])
    if show.update(show_params)
      flash[:notice] = ""
      redirect_to show_path(show)
    else
      flash[:notice] = "Something went wrong when you edited the show, please try again."
      @show = show
      render :edit
    end
  end

  # Delete Show if User has recorded it
  def destroy
    show = Show.find(params[:id])
    show.destroy
    redirect_to shows_path
  end
  
  # Class Scope Method
  def most_viewed
  end
  
  def viewed_shows
    @shows = Show.viewed_shows
  end

  private

  def show_params
    params.require(:show).permit(:name, :description, :req_recording_hours, :req_age)
  end

  # NOTE : Adding check that user "is allowed" to modify the show <<-- current implementation allows for inclusion of past recordings
  def check_user_recorded_show
    show = Show.find(params[:id])
    if !current_user.user_has_show(show)
      flash[:notice] = "You can only modify information for shows that you have recorded."
      redirect_to show_path(show)
    end
  end

end
