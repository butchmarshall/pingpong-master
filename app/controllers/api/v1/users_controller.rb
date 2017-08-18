module Api
	module V1
		class UsersController < Api::V1::BaseController
			def show
				user = User.where(:id => params[:id]).first

				if !user.nil?
					render json: user, serializer: UserSerializer
				else
					render json: user, status: :unprocessable_entity, serializer: ActiveModel::Serializer::ErrorSerializer
				end
			end

			def index
				users = User.order(rank: :desc)

				render json: users, each_serializer: UserSerializer
			end
		end
	end
end