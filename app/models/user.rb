class User < ActiveRecord::Base
	devise :database_authenticatable, :registerable, :trackable, :validatable

	has_many :game_users
	has_many :games, :through => :game_users
end
