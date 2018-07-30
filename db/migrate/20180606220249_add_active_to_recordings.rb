class AddActiveToRecordings < ActiveRecord::Migration
  def change
    add_column :recordings, :active, :boolean, default: true
  end
end
