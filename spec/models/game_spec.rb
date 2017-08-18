require "rails_helper"

#ActiveRecord::Base.logger = Logger.new(STDOUT) if defined?(ActiveRecord::Base)

RSpec.describe Game, :type => :model do
	before(:all) do
		@user_1 = User.create(:password => "asdfasdfasdf", :password_confirmation => "asdfasdfasdf", :email => "user_a@test.com")
		@user_2 = User.create(:password => "asdfasdfasdf", :password_confirmation => "asdfasdfasdf", :email => "user_b@test.com")

		@timestamp = Time.now.to_i
	end

	after(:all) do
		DatabaseCleaner.clean_with(:truncation)
	end

	describe "#create" do
		describe "errors" do
			describe "game not complete" do
				it 'if one player does not reach at least 21' do
					expect(Game.create({:played_at=>@timestamp, :players_attributes=>[{:user_id=>@user_1.id, :score=>5}, {:user_id=>@user_2.id, :score=>8}]}).errors[:players].size).to eq(1)
				end
				it 'for games with less than a two point margin' do
					expect(Game.create({:played_at=>@timestamp, :players_attributes=>[{:user_id=>@user_1.id, :score=>20}, {:user_id=>@user_2.id, :score=>21}]}).errors[:players].size).to eq(1)
				end
			end

			describe "invalid score" do
				it 'for scores outside of the ranges that are valid' do
					# Cannot score negative numbers
					expect(Game.create({:played_at=>@timestamp, :players_attributes=>[{:user_id=>@user_1.id, :score=>-1}, {:user_id=>@user_2.id, :score=>21}]}).errors[:players].size).to eq(1)

					# Scores greater than 21, victory range of two
					expect(Game.create({:played_at=>@timestamp, :players_attributes=>[{:user_id=>@user_1.id, :score=>5}, {:user_id=>@user_2.id, :score=>22}]}).errors[:players].size).to eq(1)
				end
			end

			describe "invalid user" do
				it 'if one of the users cannot be found' do
					expect(Game.create({:played_at=>@timestamp, :players_attributes=>[{:user_id=>-5, :score=>5}, {:user_id=>@user_2.id, :score=>21}]}).errors[:players].size).to eq(1)
					expect(Game.create({:played_at=>@timestamp, :players_attributes=>[{:user_id=>-5, :score=>5}, {:user_id=>0, :score=>21}]}).errors[:players].size).to eq(1)
					expect(Game.create({:played_at=>@timestamp, :players_attributes=>[{:user_id=>@user_1.id, :score=>5}, {:user_id=>0, :score=>21}]}).errors[:players].size).to eq(1)
				end
			end
		end

		describe 'success' do
			before(:all) do
				@game = Game.create({:played_at=>Time.at(@timestamp), :players_attributes=>[{:user_id=>@user_1.id, :score=>1}, {:user_id=>@user_2.id, :score=>21}]})
			end

			it 'should record time played' do
				expect(@game.played_at.to_i).to eq(@timestamp)
			end

			it 'should be persisted' do
				
				
				expect(@game.persisted?).to be(true)
			end

			it 'should have our two users' do
				expect(@game.users.length).to be(2)

				expect(@game.users[0].id).to be(@user_1.id)
				expect(@game.users[1].id).to be(@user_2.id)
			end

			it 'should have scores' do
				expect(@game.players[0].score).to eq(1)
				expect(@game.players[1].score).to eq(21)
			end
		end
	end
end