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
          s = Season.first_or_create(number: row[0])
          e = Episode.first_or_create(number: row[1], season: s)
          c = Character.first_or_create(name: row[2])
          Line.create(text: row[3], episode: e, character: c)
          i += 1

          puts "Processed line #{i}: #{row[3]&.slice(0, 20)}"
        end
      end
    end
  end
end