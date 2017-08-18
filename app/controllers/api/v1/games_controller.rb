module Api
	module V1
		class GamesController < Api::V1::BaseController
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