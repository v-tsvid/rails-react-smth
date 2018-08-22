class Api::EpisodesController < ApplicationController
  def index
    episodes_array = Episode.includes(:season).pluck('seasons.id', 'episodes.id', 'episodes.number')
    @episodes = {}
    episodes_array.each do |e|
      if @episodes[e[0]].blank?
        @episodes[e[0]] = [[e[1], e[2]]]
      else
        @episodes[e[0]] << [e[1], e[2]]
      end
    end
    render json: @episodes
  end
end