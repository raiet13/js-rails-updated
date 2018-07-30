class AddViewsToShow < ActiveRecord::Migration
  def change
    add_column :shows, :show_page_views, :integer, default: 0
  end
end
