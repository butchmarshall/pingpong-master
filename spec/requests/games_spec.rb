require 'rails_helper'

RSpec.describe Api::V1::GamesController, type: :request do
	before(:each) do
		@user_1 = User.create(:password => "asdfasdfasdf", :password_confirmation => "asdfasdfasdf", :email => "user_a@test.com")
		@user_2 = User.create(:password => "asdfasdfasdf", :password_confirmation => "asdfasdfasdf", :email => "user_b@test.com")

		@token = @user_1.create_new_auth_token()

		@header_params = {
			:CONTENT_TYPE => 'application/json',
			:ACCEPT => 'application/vnd.pingpong.v1.0+json'
		}
	end

	describe 'POST #create' do
		describe 'v1' do
			before(:each) do
				@json_payload = {
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
				}.to_json
			end

			it 'should route' do
				post '/games', @json_payload, @header_params.merge(@token)

				expect(response.status).to eq(200)
			end

			it 'should not route' do
				expect { post '/games', @json_payload, @header_params.merge(:ACCEPT => "application/vnd.badmimetype.v1.0+json").merge(@token) }.to raise_error(ActionController::RoutingError)
			end
		end
	end
end