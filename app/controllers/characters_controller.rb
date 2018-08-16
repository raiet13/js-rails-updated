class CharactersController < ApplicationController
  before_action :redirect_if_not_logged_in
  before_action :update_char_views
  skip_before_action :update_char_views, only: [:new, :create, :index, :update, :destroy]

  # Show more detailed information for a show's characters
  def index
    @show = Show.find(params[:show_id])
  end

  # New Character
  def new
    if params[:show_id] && !Show.exists?(params[:show_id])
      flash[:notice] = "You can only create characters for shows that exist."
      redirect_to shows_path
    else
      flash[:notice] = ""
      @show = Show.find(params[:show_id])
      @character = Character.new
    end
  end

  # Create new character
  def create
    character = Character.new(char_params)
    show = Show.find(params[:character][:show_id])
    if character.save
      flash[:notice] = ""
      redirect_to show_path(show)
    else
      flash[:notice] = "Something went wrong during character creation, please try again."
      @character = character
      @show = show
      render :new
    end
  end
  
  # Show Character
  def show
    @character = Character.find(params[:id])
    respond_to do |format|
      format.html { render :show }
      format.json { render json: @character, status: 200}
    end
  end

  # Edit character
  def edit
    if params[:show_id]
      @show = Show.find_by(id: params[:show_id])
      if @show.nil?
        flash[:notice] = "You can only edit characters for shows that exist."
        redirect_to shows_path
      else
        @character = @show.characters.find_by(id: params[:id])
        if @character.nil?
          flash[:notice] = "You can only edit characters that exist for this show."
          redirect_to show_path(@show)
        end
      end
    else
      flash[:notice] = ""
      @character = Character.find(params[:id])
    end
  end

  # Update character name
  def update
    character = Character.find(params[:id])
    show = Show.find(params[:character][:show_id])
    if character.update(char_params)
      flash[:notice] = ""
      redirect_to character_path(character)
    else
      flash[:notice] = "Something went wrong during character update, please try again."
      @character = character
      @show = show
      render :edit
    end
  end

  # Delete character (if say it was created for the wrong show)
  def destroy
    character = Character.find(params[:id])
    show = character.show
    character.destroy
    redirect_to show_path(show)
  end

  private

  def char_params
    params.require(:character).permit(:name, :role, :description, :show_id)
  end
  
  def update_char_views
    char = Character.find(params[:id])
    char.char_page_views += 1
    char.save
  end

end
