require "rails_helper"

RSpec.describe EloRank do
	
	it "should calculate the updated rank in a match between two players" do
		elo = EloRank.new

		player_1_score = 1200
		player_2_score = 1400

		expected_player_1_score = elo.expected(player_1_score, player_2_score)
		expected_player_2_score = elo.expected(player_2_score, player_1_score)

		player_1_score_new = elo.update_rank(expected_player_1_score, 1, player_1_score)
		player_2_score_new = elo.update_rank(expected_player_2_score, 0, player_2_score)

		expect(player_1_score_new).to eq(1232)
		expect(player_2_score_new).to eq(1368)
	end
end