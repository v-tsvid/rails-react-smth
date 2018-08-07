class Line < ApplicationRecord
  belongs_to :episode
  belongs_to :character

  def next_id
    self.class.where('id > ?', self.id).order('id ASC').pluck(:id).first
  end

  def previous_id
    self.class.where('id < ?', self.id).order('id DESC').pluck(:id).first
  end
end
