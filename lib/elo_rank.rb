# Adapted from https://github.com/dmamills/elo-rank/blob/master/index.js

# Method used to calculate updated Elo rank between two players
class EloRank
	attr_reader :k_factor

	def initialize(k_factor = 32)
		@k_factor = k_factor
	end

	# Calculate the expected score if user_a plays user_b
	def expected(user_a_rank, user_b_rank)
		return 1.0 / (1.0 + (0.0 ** ((user_a_rank.to_f - user_b_rank.to_f) / 400.0)))
	end

	def update_rank(expected, actual, current)
		(current + @k_factor * (actual - expected)).to_i
	end
end