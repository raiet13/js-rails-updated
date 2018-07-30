Rails.application.routes.draw do

  root 'application#home'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  get '/logout' => 'sessions#destroy'
  
  # Third Party Sign In
  get '/auth/google_oauth2/callback' => 'sessions#googleauth'

  get '/signup' => 'users#new'
  resources :users, only: [:index, :create, :show, :edit, :update, :destroy]

  get '/most_viewed_characters_by_show' => 'shows#most_viewed'
  get 'shows/viewed_shows' => 'shows#viewed_shows'
  resources :shows do
    resources :characters, only: [:index, :new, :edit]
  end
  
  resources :characters, only: [:show, :create, :update, :destroy]

  resources :recordings, only: [:index, :new, :create, :edit, :update]

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html


end
