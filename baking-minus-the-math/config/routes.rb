Rails.application.routes.draw do
  resources :categories
  root "categories#index"
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  # root to: redirect("/categories")
  # resources :ingredients
  # resources :recipes
  # resources :categories do
  #   resources :recipes
  # end
  # resources :recipes do
  #   resources :ingredients
  # end
  # resources :users
end
