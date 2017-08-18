module Api
	module V1
		class GamesController < Api::V1::BaseController
			# Games that have been played
			#
			# params[:user_id] - Get all the games a user has played
			def index
				if !params[:user_id].nil? && user = User.where(id: params[:user_id]).first
					games = user.games.includes(:players => [:user])
				else
					games = Game.includes(:players => [:user])
				end

				render json: games, include: 'players,players.user', each_serializer: GameSerializer
			end

			# Create a new game
			def create
				game = Game.create(game_params)

				if !game.errors.any?
					render json: game, include: 'players,players.user', serializer: GameSerializer
				else
					render json: game, status: :unprocessable_entity, serializer: ActiveModel::Serializer::ErrorSerializer
				end
			end

			private
				def game_params
					ActiveModelSerializers::Deserialization.jsonapi_parse!(json_params, embedded: [:players])
				end
		end
	end
end