Rails.application.routes.draw do
  root to: 'pages#home'
  namespace :api, defaults: { format: :json } do
    resources :lines, only: :show

    resources :seasons, only: :index do
      resources :episodes do
        resources :lines, controller: 'season_episode_lines', only: :show
      end

      resources :lines, controller: 'season_lines', only: :show
    end

    resources :episodes, only: :index
  end
end
