class ConvertNumberInEpisodesToInt < ActiveRecord::Migration[5.2]
  def up
    change_column :episodes, :number, 'integer USING CAST(number AS integer)'
  end

  def down
    change_column :episodes, :number, :string
  end
end
