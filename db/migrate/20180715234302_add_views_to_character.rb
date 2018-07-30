class AddViewsToCharacter < ActiveRecord::Migration
  def change
    add_column :characters, :char_page_views, :integer, default: 0
  end
end
