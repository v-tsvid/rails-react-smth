json.set! :id, @line_val[0]
json.set! :text, @line_val[1]
json.set! :name, @line_val[2]
json.set! :episode_id, @line_val[3]
json.set! :season_id,  @line_val[4]
json.set! :next_id, @line.next_id(season_id: @season.id)
json.set! :previous_id, @line.previous_id(season_id: @season.id)