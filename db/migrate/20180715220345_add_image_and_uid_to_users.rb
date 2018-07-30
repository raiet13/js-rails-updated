class AddImageAndUidToUsers < ActiveRecord::Migration
  def change
    add_column :users, :image, :string
    add_column :users, :uid, :string
  end
end
