class Api::SeasonsController < ApplicationController
  def index
    @seasons = Season.pluck(:id, :number)
  end
end