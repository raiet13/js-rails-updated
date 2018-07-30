class CreateCharacters < ActiveRecord::Migration
  def change
    create_table :characters do |t|
      t.string :name
      t.belongs_to :show, foreign_key: true

      t.timestamps null: false
    end
  end
end
