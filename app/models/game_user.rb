class GameUser < ActiveRecord::Base
	belongs_to :game
	belongs_to :user
	validates :user, :presence => true

	validates :score, numericality: { greater_than_or_equal_to: 0, only_integer: true }, :presence => true
end
