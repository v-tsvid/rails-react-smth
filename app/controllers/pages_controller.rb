class PagesController < ApplicationController
  def home
    @first_line_id = Line.first.id
  end
end
