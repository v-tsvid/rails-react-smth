# json.array!(@line) do |column|
#   Rails.logger.debug('lol')
#   Rails.logger.debug(column)
#    # :id, :text, :name, :episode_id, :next_id, :previous_id
# end
# 77812, "Thanks, Tom, a smug alert is in effect at least tomorrow morning.  All those hybrid cars on the road have caused heavy smug to develop over most of Park and Jefferson Counties. On the national map, we can see smug over Denver and developing smug in Los Angeles. However, San Francisco is once again the smuggiest city in the country.", "Keenan", 23]
json.set! :id, @line_val[0]
json.set! :text, @line_val[1]
json.set! :name, @line_val[2]
json.set! :episode_id, @line_val[3]
json.set! :next_id, @line.next_id
json.set! :previous_id, @line.previous_id