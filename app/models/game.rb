class Game < ActiveRecord::Base
	has_many :players, class_name: "GameUser"
	validates_associated :players
	accepts_nested_attributes_for :players

	has_many :users, :through => :players

	validate :validate_played_at
	validate :validate_players
	validate :validate_player_scores

	after_create :after_create_update_users_elo_rank

	# Updates elo ranking between the two players
	def after_create_update_users_elo_rank
		winner = ((self.players[0].score.to_i > self.players[1].score.to_i)? self.players[0] : self.players[1]).user;
		looser = ((self.players[0].score.to_i > self.players[1].score.to_i)? self.players[1] : self.players[0]).user;

		# Dont let anyone else touch the scores until they're updated
		winner.lock!
		looser.lock!

		winner_rank = winner.rank
		looser_rank = looser.rank

		elo = EloRank.new(32)

		expected_winner_rank = elo.expected(winner_rank, looser_rank)
		expected_looser_rank = elo.expected(looser_rank, winner_rank)

		winner_rank_new = elo.update_rank(expected_winner_rank, 1, winner_rank)
		looser_rank_new = elo.update_rank(expected_looser_rank, 0, looser_rank)

		winner.update_attribute(:rank, winner_rank_new)
		looser.update_attribute(:rank, looser_rank_new)
	end

	private
		def validate_played_at
			errors.add(:players, "must have a date played") if self.played_at.to_i <= 0
		end

		def validate_player_scores
			errors.add(:players, "at least one must reach 21") if players.detect { |player| player.score.to_i >= 21 }.nil?

			# Two players are required to record a game
			if players.size != 2
				errors.add(:players, "must have exactly 2 players")
			else
				score_diff = (players[0].score.to_i - players[1].score.to_i).abs

				# Scores greater than 21 need a victory of two
				if players[0].score.to_i > 21 || players[1].score.to_i > 21 && score_diff != 2
					errors.add(:players, "if a player scores greater than 21, the range of victory must be 2")
				end

				errors.add(:players, "a player must have a lead of at least 2") if (players[0].score.to_i - players[1].score.to_i).abs < 2
			end
		end
	
		def validate_players
			if players.size != 2
				errors.add(:players, "exactly two")
			else
				if players[0].user_id === players[1].user_id
					errors.add(:players, "cannot play yourself")
				end
			end
		end
end
