Rails.application.routes.draw do
	namespace :api do
		mount_devise_token_auth_for 'User', at: '/auth', skip: [:omniauth_callbacks]
	end

	devise_for :users
	root to: "home#index"
	get '/history', to: 'home#history'
	get '/log',     to: 'home#log'

	scope module: :api do
		constraints(ApiVersionConstraint.new(version: 1.0)) do
			scope module: :v1 do
				resources :games
				resources :users do
					resources :games
				end
			end
		end
	end
end
