class Character < ApplicationRecord
  belongs_to :show
  validates_presence_of :name
  validates_associated :show

  def self.most_viewed_by_show(char_show)
    self.by_views_by_show(char_show).first
  end
  
  def self.by_views_by_show(char_show)
    chars = self.select(:name, :id, :char_page_views).where(show: char_show)
    chars.select(:name, :char_page_views).order(char_page_views: :desc)
    by_views_array = chars.to_a
    by_views_array.collect do |char|
      self.find(char.id)
    end
  end

  def self.most_viewed
    self.by_views.first
  end

  def self.by_views
    selected = self.select(:name, :id, :char_page_views).order(char_page_views: :desc)
    by_views_array = selected.to_a
    by_views_array.collect do |char|
      self.find(char.id)
    end
 end

end
