## Getting Started

1. Run `bundle install`
2. Run `rake db:migrate`
3. Run `bundle exec rake webpacker:compile` ** Dont forget this or nothing will load **
4. Run `rake db:seed`
5. Run `rails s`
6. Create a new account

## Requirements

The purpose of this app is to allow users to log their pingpong games and to show the leaderboard ranking.

Time allotted: 4 hours.

#### 1. Game Logging

1. Add necessary functionality to log a game between two users
  * Games follow standard pingpong rules. They are games to 21. Each game needs to be won by a two point margin. This means that some games may go over 21. Examples of acceptable scores: 9-21, 21-19, 24-22.
  * Games are inputted on an honorary system (no approval required)
2. Add history page which allow the logged in user to view history of games they participated in. This includes: timestamp, opponent user, game score

#### 2. Leadboard

Design a solution to populate the leaderboard page with rankings:
  * Rankings are updated every time a game is logged
  * Not all wins should count the same. e.g: a player ranked 4 beating a player ranked 5 should not count the same as a player ranked 5 beating a player ranked 1
  * When the leaderboard is first created all the users will be equal in ranking
  * Document your approach

**Please note the following**:

* The framework of the app already allows users to register and sign in
* Mockups for all UI to be developed are in the app already
* Add all necessary migrations, models (with relationships, methods and validations), controllers, and tests.
* The UI uses bootstrap 3.3.5. [See docs here](https://bootstrapdocs.com/v3.3.5/docs/getting-started/).
* The current `Gemfile` should be sufficient for the task. Please feel free to include `RSpec` (if needed).

## Submit Your Code

Upload your code to a public repository

## Evaluation

We are evaluating you as a backend ruby developer.  We will score your completion of the task as follows:

* 35 points for features completion
* 35 points for code quality (RESTful, simple, readable)
* 30 points for tests coverage
