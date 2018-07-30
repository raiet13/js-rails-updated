class ApplicationRecord < ActiveRecord::Base
  # NOTE : Added for loading slug module
  # include Slugifiable

  self.abstract_class = true
end
