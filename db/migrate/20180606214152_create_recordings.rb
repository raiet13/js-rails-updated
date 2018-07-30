class CreateRecordings < ActiveRecord::Migration
  def change
    create_table :recordings do |t|
      t.string :name
      t.belongs_to :user, foreign_key: true
      t.belongs_to :show, foreign_key: true

      t.timestamps null: false
    end
  end
end
