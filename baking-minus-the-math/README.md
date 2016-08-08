# README
rails new baking-minus-the-math -d postgresql

rake db:create


1. rails g model Category Cat_name:string

2. rails g model Recipe title:string 'servings:decimal{5,2}' 'calories:decimal{7,2}' 'rating:decimal{4,2}' category:references


3. rails g model Ingredients component:string amount:string measurement:string amount2:string measurement2:string amount3:string measurement3:string amount4:string measurement4:string recipe:references

4. rake db:migrate

psql

\l lists all your databases
\c name of data base connects you to that database
\d will show you all your dependecies
\q quit

rails g migration AddInstructionsToRecipes instructions:text

models/ingredient.rb -

class Ingredient < ActiveRecord::Base
  belongs_to :recipe
end

models/recipe.rb -

class Recipe < ActiveRecord::Base
  validates :mailing_title, :last_name, presence: true
  has_many :ingredients, dependent: :destroy
  belongs_to :category
end

models/category.rb -

class Category < ActiveRecord::Base
   validates :Cat_name, presence: true
   has_many :recipes
end

rake db:seed

psql
\c baking-minus-the-math_development
SELECT * FROM recipes;



1. add gem 'devise' to gem file
2. bundle install
3. rails g devise:install
4. add to gemfile - gem 'devise_token_auth'
5. bundle install
6. rails g devise_token_auth:install User auth


:string |                   VARCHAR             | :limit => 1 to 255 (default = 255)  

:text   | TINYTEXT, TEXT, MEDIUMTEXT, or LONGTEXT2 | :limit => 1 to 4294967296 (default = 65536)

'price:decimal{5,2}'
t.decimal :tax_percent, :precision => 6, :scale => 4
Would give you a total of six digits, with 4 after the decimal point.

(5.65235534).round(2)
#=> 5.65

this is what the solution has in it:

gem 'sdoc', '~> 0.4.0', group: :doc

gem 'devise'
gem 'devise_token_auth'
gem 'httparty'
gem 'rack-cors', require: 'rack/cors'


Some setup you must do manually if you haven't yet:

  1. Ensure you have defined default url options in your environments files. Here
     is an example of default_url_options appropriate for a development environment
     in config/environments/development.rb:

       config.action_mailer.default_url_options = { host: 'localhost', port: 3000 }

     In production, :host should be set to the actual host of your application.

  2. Ensure you have defined root_url to *something* in your config/routes.rb.
     For example:

       root to: "home#index"

  3. Ensure you have flash messages in app/views/layouts/application.html.erb.
     For example:

       <p class="notice"><%= notice %></p>
       <p class="alert"><%= alert %></p>

  4. You can copy Devise views (for customization) to your app by running:

       rails g devise:views

===============================================================================
marasanders@Maras-MacBook-Air-2:~/wdi/projects/project-4/baking-minus-the-math  $

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...