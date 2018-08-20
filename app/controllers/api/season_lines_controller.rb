class Api::SeasonLinesController < ApplicationController
  def show
    @season = Season.find(params[:season_id])
    @line_val = Line
                  .where(season_id: params[:season_id], id: params[:line_id])
                  .includes(:character, episode: :season)
                  .pluck('lines.id', 'text', 'characters.name', 'episode_id', 'seasons.id')
                  .first
  end
end