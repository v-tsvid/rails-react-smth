json do
  @episodes.each do |episode|
    json.set! episode[0].to_s, [episode[1], episode[2]]
  end
end
