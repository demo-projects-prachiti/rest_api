Rails.application.routes.draw do
  
  # get '/current_user', to: 'current_user#index'
  devise_for :users,
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  
  namespace :api, defaults: {format: :json} do
    namespace :v1, defaults: {format: :json} do   
      resources :posts do 
        resources :comments
      end 
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
