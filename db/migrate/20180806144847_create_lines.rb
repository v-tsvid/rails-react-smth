class CreateLines < ActiveRecord::Migration[5.2]
  def change
    create_table :lines do |t|
      t.string :text
      t.references :episode, foreign_key: true, index: true
      t.references :character, foreign_key: true, index: true

      t.timestamps
    end
  end
end
