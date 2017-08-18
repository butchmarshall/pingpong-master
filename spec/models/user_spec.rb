require "rails_helper"

RSpec.describe User, :type => :model do
	before(:all) do
		@user_1 = User.create(:password => "asdfasdfasdf", :password_confirmation => "asdfasdfasdf", :email => "user_a@test.com")
		@user_2 = User.create(:password => "asdfasdfasdf", :password_confirmation => "asdfasdfasdf", :email => "user_b@test.com")

		@timestamp = Time.now.to_i
	end

	after(:all) do
		DatabaseCleaner.clean_with(:truncation)
	end

	describe "#rank" do
		it 'should increase when a game is won, decrease when a game is lost' do
			Game.create({:played_at=>@timestamp, :players_attributes=>[{:user_id=>@user_1.id, :score=>21}, {:user_id=>@user_2.id, :score=>8}]})

			expect(@user_1.reload.rank).to eq(1016)
			expect(@user_2.reload.rank).to eq(984)

			Game.create({:played_at=>@timestamp, :players_attributes=>[{:user_id=>@user_2.id, :score=>21}, {:user_id=>@user_1.id, :score=>8}]})

			expect(@user_1.reload.rank).to eq(984)
			expect(@user_2.reload.rank).to eq(1016)
		end
	end
end