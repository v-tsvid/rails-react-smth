class Api::SeasonsController < ApplicationController
  def index
    @seasons = Season.order(number: :asc).pluck(:id, :number)
  end
end