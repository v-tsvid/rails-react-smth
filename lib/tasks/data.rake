require 'csv'

namespace :data do
  desc 'populate data'
  task populate: :environment do
    batch_size = 2000

    File.open("public/test_data.csv") do |file|
      headers = file.first
      file.lazy.each_slice(batch_size) do |lines|
        csv_rows = CSV.parse(lines.join, write_headers: true, headers: headers, liberal_parsing: true)

        csv_rows.each do |row|
          Season.first_or_create(number: row[0])
          e = Episode.first_or_create(number: row[1])
          c = Character.first_or_create(name: row[2])
          Line.create(text: row[3], episode: e, character: c)

          puts "Line processed: #{row[3].slice(0, 20)}"
        end
      end
    end
  end
end