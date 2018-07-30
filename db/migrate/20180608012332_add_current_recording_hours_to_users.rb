class AddCurrentRecordingHoursToUsers < ActiveRecord::Migration
  def change
    add_column :users, :current_recording_hours, :integer
  end
end