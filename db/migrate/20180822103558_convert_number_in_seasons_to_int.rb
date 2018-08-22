class ConvertNumberInSeasonsToInt < ActiveRecord::Migration[5.2]
  def up
    change_column :seasons, :number, 'integer USING CAST(number AS integer)'
  end

  def down
    change_column :seasons, :number, :string
  end
end
