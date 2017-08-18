class GameUserSerializer < ActiveModel::Serializer
	type 'players'

	attributes :score

	has_one :user
	has_one :game
end