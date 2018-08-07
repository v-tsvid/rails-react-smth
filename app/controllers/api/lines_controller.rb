class Api::LinesController < ApplicationController
  def show
    @line = Line.find(params[:id])
    @line_val = Line.where(id: params[:id]).includes(:character).pluck('lines.id', 'text', 'characters.name', 'episode_id').first
  end
end
