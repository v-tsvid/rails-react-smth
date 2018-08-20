@seasons.each do |season|
  json.set! season[0].to_s, season[1]
end