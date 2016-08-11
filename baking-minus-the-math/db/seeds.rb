# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

Ingredient.destroy_all
Recipe.destroy_all
Category.destroy_all


cake = Category.create!(Cat_name:"Cake")
beef = Category.create!(Cat_name:"Beef")
pasta = Category.create!(Cat_name:"Pasta")
chicken = Category.create!(Cat_name:"Chicken")
rice = Category.create!(Cat_name:"Rice")
dessert = Category.create!(Cat_name:"Dessert")
cookies = Category.create!(Cat_name:"Cookies")
potatoes = Category.create!(Cat_name:"Potatoes")
turkey = Category.create!(Cat_name:"Turkey")
kugel = Category.create!(Cat_name:"Kugel")
soup = Category.create!(Cat_name:"Soup")
salad = Category.create!(Cat_name:"Salad")
vegetable = Category.create!(Cat_name:"Vegetables")


chocolateCake = Recipe.create!(title:"Bubby's Chocolate Cake",  servings: 12, calories: 250, rating: 10, category: cake, instructions: "Put all ingredients in bowl mix until fully blended. Bake in greased 9X13 for 40 minutes.")
broiledChicken = Recipe.create!(title:"1-2-3 Broiled Chicken",  servings: 4, calories: 180, rating: 8, category: chicken, instructions: "Portion chicken into 4 - 4 oz. pieces set aside. Mix remaining ingredients in ziploc bag or appropriate sized container until blended, add chicken and marinate no longer than 4 hours, broil on high or grill 7 minutes each side until centers are no longer pink.")
vanillaCake = Recipe.create!(title:"Best Vanilla Pound Cake",  servings: 12, calories: 200, rating: 9, category: cake, instructions: "Mix dry ingredients until blended, add oil and mix for 1 minute, add remaining ingredients and mix until well blended. Bake in greased 9X13 at 350 degrees for 1 hour.")
butternutSquashSoup = Recipe.create!(title:"Butternut Squash Soup",  servings: 6, calories: 130, rating: 2, category: soup, instructions: "Cut butternut squash in half and bake at 375 degrees face down on baking sheet for 50 minutes. Dice onion and fry on medium heat  in 4 quart pot until transparent. Scoop flesh set aside. Alternately boil cube and peel raw butternut squash boil for 30 minutes and drain.  Add flour to onion and mix thoroughly add 1 C water mix thoroughly, add remaining water, salt, pepper and consume mix, bring to a boil. Lower flame to simmer for 10 minutes. Remove from heat and blend with hand blender. Use cream to garnish.")

chocolateCakeIngredient1 = Ingredient.create!(component: "Flour", amount:"2", measurement: "C", recipe: chocolateCake)
chocolateCakeIngredient2 = Ingredient.create!(component: "Cocoa", amount:"2/3", measurement: "C", recipe: chocolateCake)
chocolateCakeIngredient3 = Ingredient.create!(component: "Sugar", amount:"1 3/4", measurement: "C", recipe: chocolateCake)
chocolateCakeIngredient4 = Ingredient.create!(component: "Oil", amount:"2/3", measurement: "C", recipe: chocolateCake)
chocolateCakeIngredient5 = Ingredient.create!(component: "Water", amount:"1", measurement: "C", recipe: chocolateCake)
chocolateCakeIngredient6 = Ingredient.create!(component: "Eggs", amount:"3", recipe: chocolateCake)
chocolateCakeIngredient7 = Ingredient.create!(component: "Baking Powder", amount:"1/2", measurement: "tsp", recipe: chocolateCake)
chocolateCakeIngredient8 = Ingredient.create!(component: "Salt", amount:"1", measurement: "tsp", recipe: chocolateCake)
chocolateCakeIngredient9 = Ingredient.create!(component: "Vanilla", amount:"1", measurement: "tsp", recipe: chocolateCake)

broiledChickenIngredient1 = Ingredient.create!(component: "Skinless Boneless Chicken", amount:"16", measurement: "oz",recipe: broiledChicken)
broiledChickenIngredient2 = Ingredient.create!(component: "Oil", amount:"1/2", measurement: "C",recipe: broiledChicken)
broiledChickenIngredient3 = Ingredient.create!(component: "Soy Sauce", amount:"1/4", measurement: "C",recipe: broiledChicken)
broiledChickenIngredient4 = Ingredient.create!(component: "White Wine", amount:"1/4", measurement: "C",recipe: broiledChicken)
broiledChickenIngredient5 = Ingredient.create!(component: "Dry Mustard", amount:"1/2", measurement: "tsp",recipe: broiledChicken)
broiledChickenIngredient6 = Ingredient.create!(component: "Salt", amount:"1/2", measurement: "tsp",recipe: broiledChicken)
broiledChickenIngredient7 = Ingredient.create!(component: "Pepper", amount:"1/8", measurement: "C",recipe: broiledChicken)
broiledChickenIngredient8 = Ingredient.create!(component: "Garlic Crushed", amount:"2", measurement: "tsp",recipe: broiledChicken)

vanillaCakeIngredient1 = Ingredient.create!(component: "Flour", amount:"4", measurement: "C", recipe: vanillaCake)
vanillaCakeIngredient3 = Ingredient.create!(component: "Sugar", amount:"2", measurement: "C", recipe: vanillaCake)
vanillaCakeIngredient4 = Ingredient.create!(component: "Oil", amount:"1", measurement: "C", recipe: vanillaCake)
vanillaCakeIngredient5 = Ingredient.create!(component: "Soy Milk", amount:"1", measurement: "C", recipe: vanillaCake)
vanillaCakeIngredient6 = Ingredient.create!(component: "Eggs", amount:"6", recipe: vanillaCake)
vanillaCakeIngredient7 = Ingredient.create!(component: "Baking Powder", amount:"2", measurement: "tsp", recipe: vanillaCake)
vanillaCakeIngredient8 = Ingredient.create!(component: "Salt", amount:"1", measurement: "tsp", recipe: vanillaCake)
vanillaCakeIngredient9 = Ingredient.create!(component: "Vanilla", amount:"2", measurement: "Tbs", recipe: vanillaCake)

butternutSquashSoupIngredient1 = Ingredient.create!(component: "Butternut Squash", amount:"1", measurement: "Medium",recipe: butternutSquashSoup)
butternutSquashSoupIngredient8 = Ingredient.create!(component: "Onion", amount:"1", measurement: "Large",recipe: butternutSquashSoup)
butternutSquashSoupIngredient2 = Ingredient.create!(component: "Margarine or Oil", amount:"6", measurement: "Tbs",recipe: butternutSquashSoup)
butternutSquashSoupIngredient8 = Ingredient.create!(component: "Flour", amount:"4", measurement: "Tbs",recipe: butternutSquashSoup)
butternutSquashSoupIngredient2 = Ingredient.create!(component: "Water", amount:"6", measurement: "C",recipe: butternutSquashSoup)
butternutSquashSoupIngredient6 = Ingredient.create!(component: "Salt", amount:"2", measurement: "tsp",recipe: butternutSquashSoup)
butternutSquashSoupIngredient7 = Ingredient.create!(component: "Pepper", amount:"1/4", measurement: "C",recipe: butternutSquashSoup)
butternutSquashSoupIngredient8 = Ingredient.create!(component: "Consoume Mix", amount:"3", measurement: "Tbs",recipe: butternutSquashSoup)
butternutSquashSoupIngredient8 = Ingredient.create!(component: "Half-and-Half", amount:"1", measurement: "C",recipe: butternutSquashSoup)
