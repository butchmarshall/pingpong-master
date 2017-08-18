class UserSerializer < ActiveModel::Serializer
	attributes :name, :email, :rank, :total_games

	def total_games
		object.games.size
	end

	link(:self) { user_path(object.id) }
end