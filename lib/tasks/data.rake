require 'csv'

namespace :data do
  desc 'drop data'
  task drop: :environment do
    Line.delete_all
    Character.delete_all
    Episode.delete_all
    Season.delete_all
  end

  desc 'populate data'
  task populate: :environment do
    batch_size = 2000
    i = 0

    File.open("public/data.csv") do |file|
      headers = file.first
      file.lazy.each_slice(batch_size) do |lines|
        csv_rows = CSV.parse(lines.join, headers: headers, liberal_parsing: true)

        csv_rows.each do |row|
          i += 1
          next if row.to_h.values.join(',') == headers.strip
          s = Season.where(number: row[0]).first_or_create
          e = Episode.where(number: row[1], season: s).first_or_create
          c = Character.where(name: row[2]).first_or_create
          Line.create(text: row[3], episode: e, character: c)
    
          puts "Processed line #{i}: #{row[3]&.slice(0, 20)}"
        end
      end
    end
  end
end