class AddUserRank < ActiveRecord::Migration
  def change
	add_column :users, :rank, :integer, :default => 1000
  end
end
