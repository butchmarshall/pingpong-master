require 'rails_helper'

RSpec.describe Api::V1::GamesController, type: :controller do
	before(:each) do
		@user_1 = User.create(:name => "Steve Silva", :password => "asdfasdfasdf", :password_confirmation => "asdfasdfasdf", :email => "user_a@test.com")
		@user_2 = User.create(:name => "Joe Smith", :password => "asdfasdfasdf", :password_confirmation => "asdfasdfasdf", :email => "user_b@test.com")

		@token = @user_1.create_new_auth_token()

		@header_params = {
			:CONTENT_TYPE => 'application/json',
			:ACCEPT => 'application/vnd.pingpong.v1.0+json'
		};
	end

	describe "POST create" do
		it 'should create' do
			post :create, {
				"data": {
					"type": "games",
					"attributes": {
						"played_at": DateTime.now.to_i
					},
					"relationships": {
						"players": {
							"data": [
								{
									"type": "players",
									"attributes": {
										"user_id": @user_1.id,
										"score": 21,
									}
								},
								{
									"type": "players",
									"attributes": {
										"user_id": @user_2.id,
										"score": 5,
									}
								}
							]
						}
					}
				}
			}.to_json, @header_params.merge(@token)

			expect(response.status).to eq(200)
		end

		it 'should be unauthorized' do
			post :create, {
				"data": {
					"type": "games",
					"attributes": {
						"played_at": DateTime.now.to_i
					},
					"relationships": {
						"players": {
							"data": [
								{
									"type": "players",
									"attributes": {
										"user_id": @user_1.id,
										"score": 21,
									}
								},
								{
									"type": "players",
									"attributes": {
										"user_id": @user_2.id,
										"score": 5,
									}
								}
							]
						}
					}
				}
			}.to_json, @header_params

			expect(response.status).to eq(401)
		end

		it 'should not create' do
			post :create, {
				"data": {
					"type": "games",
					"attributes": {
						"played_at": DateTime.now.to_i
					},
					"relationships": {
						"players": {
							"data": [
								{
									"type": "players",
									"attributes": {
										"user_id": @user_2.id,
										"score": 5,
									}
								}
							]
						}
					}
				}
			}.to_json, @header_params.merge(@token)

			expect(response.status).to eq(422)
		end
	end
end
