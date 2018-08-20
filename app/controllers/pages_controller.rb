class PagesController < ApplicationController
  def home
    @starting_line_id = Line.order('RANDOM()').first.id
  end
end
