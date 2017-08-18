Rails.application.routes.draw do
	namespace :api do
		mount_devise_token_auth_for 'User', at: '/auth', skip: [:omniauth_callbacks]
	end

	devise_for :users
	root to: "home#index"
	get '/history', to: 'home#history'
	get '/log',     to: 'home#log'
end
