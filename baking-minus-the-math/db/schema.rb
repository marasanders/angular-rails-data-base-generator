# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160808163806) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "categories", force: :cascade do |t|
    t.string   "Cat_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingredients", force: :cascade do |t|
    t.string   "component"
    t.string   "amount"
    t.string   "measurement"
    t.string   "amount2"
    t.string   "measurement2"
    t.string   "amount3"
    t.string   "measurement3"
    t.string   "amount4"
    t.string   "measurement4"
    t.string   "amount5"
    t.string   "measurement5"
    t.integer  "recipe_id"
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["recipe_id"], name: "index_ingredients_on_recipe_id", using: :btree
  end

  create_table "recipes", force: :cascade do |t|
    t.string   "title"
    t.decimal  "servings",     precision: 5, scale: 2
    t.decimal  "calories",     precision: 7, scale: 2
    t.decimal  "rating",       precision: 4, scale: 2
    t.integer  "category_id"
    t.datetime "created_at",                           null: false
    t.datetime "updated_at",                           null: false
    t.text     "instructions"
    t.index ["category_id"], name: "index_recipes_on_category_id", using: :btree
  end

  add_foreign_key "ingredients", "recipes"
  add_foreign_key "recipes", "categories"
end