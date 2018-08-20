class Api::SeasonsController < ApplicationController
  def index
    @seasons = Season.all.pluck(:id, :number)
  end
end