class CharacterSerializer < ActiveModel::Serializer
  attributes :id, :name, :role, :description, :char_page_views
  belongs_to :show, serializer: CharacterShowSerializer
end