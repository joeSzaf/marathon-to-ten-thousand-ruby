class CreateActivities < ActiveRecord::Migration[5.2]
  def change
    create_table :activities do |t|
      t.string :name, null: false
      t.string :type, null: false
      t.date :date, null: false
      t.float :duration, null: false
      t.text :note

      t.belongs_to :user, null: false

      t.timestamps null: false
    end
  end
end
