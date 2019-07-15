Rails.application.routes.draw do
  root 'homes#index'
  devise_for :users
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :activities, only: [:index, :show, :new]

  namespace :api do
    namespace :v1 do
      resources :activities, only: [:index, :show, :create, :update]
    end
  end
end
