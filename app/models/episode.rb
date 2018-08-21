class Episode < ApplicationRecord
  belongs_to :season
  has_many :lines, dependent: :destroy
end
