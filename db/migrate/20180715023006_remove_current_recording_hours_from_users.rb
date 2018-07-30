class RemoveCurrentRecordingHoursFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :current_recording_hours, :integer
  end
end
