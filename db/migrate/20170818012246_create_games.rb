class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.timestamp :played_at

      t.timestamps null: false
    end
  end
end
