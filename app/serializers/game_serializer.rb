class GameSerializer < ActiveModel::Serializer
	type 'games'
	include Rails.application.routes.url_helpers

	attributes :id

	has_many :players, serializer: GameUserSerializer

	attribute :played_at do
		object.played_at.to_i
	end

	link(:self) { game_path(object.id) }
end