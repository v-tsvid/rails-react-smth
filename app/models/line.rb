class Line < ApplicationRecord
  belongs_to :episode
  belongs_to :character

  def next_id(season_id = nil)
    pre_result(season_id)
      .where('id > ?', self.id)
      .order('id ASC')
      .pluck(:id)
      .first
  end

  def previous_id(season_id = nil)
    pre_result(season_id)
      .where('id < ?', self.id)
      .order('id DESC')
      .pluck(:id)
      .first
  end

  private

  def pre_result(season_id)
    season_id ? self.class.where(season_id: season_id) : self.class.all
  end
end
