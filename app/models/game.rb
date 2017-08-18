class Game < ActiveRecord::Base
	has_many :players, class_name: "GameUser"
	validates_associated :players
	accepts_nested_attributes_for :players

	has_many :users, :through => :players

	validate :validate_players
	validate :validate_player_scores

	private
		def validate_player_scores
			errors.add(:players, "at least one must reach 21") if players.detect { |player| player.score >= 21 }.nil?

			# Two players are required to record a game
			if players.size != 2
				errors.add(:players, "must have exactly 2 players")
			else
				score_diff = (players[0].score - players[1].score).abs

				# Scores greater than 21 need a victory of two
				if players[0].score > 21 || players[1].score > 21 && score_diff != 2
					errors.add(:players, "if a player scores greater than 21, the range of victory must be 2")
				end

				errors.add(:players, "a player must have a lead of at least 2") if (players[0].score - players[1].score).abs < 2
			end
		end
	
		def validate_players
			errors.add(:players, "exactly two") if players.size != 2
		end
end
