"use strict";

(function(){
  angular
  .module("luv2cook", [
    "ui.router",
    "ngResource",
    "categories"
  ])
  .config(["$stateProvider", "$locationProvider", RouterFunction])
  .factory("CategoryFactory", [
    "$resource",
    CategoryFactoryFunction
  ])
  .factory("RecipeFactory", [
    "$resource",
    RecipeFactoryFunction
  ])
  .factory("IngredientFactory", [
    "$resource",
    IngredientFactoryFunction
  ])
  .controller("CategoryController", [
    "$resource",
    "CategoryFactory",
    "$http",
    "$state",
    CategoryController
  ])
  .controller("CategoryShowController", [
    "CategoryFactory",
    "RecipeFactory",
    "IngredientFactory",
    "$stateParams",
    "$resource",
    "$state",
    CategoryShowControllerFunction
  ])
  .controller("RecipeIndexController", [
    "$resource",
    "RecipeFactory",
    RecipeController
  ])
  .controller("RecipeShowController", [
    "CategoryFactory",
    "RecipeFactory",
    "IngredientFactory",
    "$stateParams",
    "$resource",
    "$state",
    RecipeShowControllerFunction
  ])
  // .controller("RecipeNewController", [
  //   "CategoryFactory",
  //   "RecipeFactory",
  //   "IngredientFactory",
  //   "$stateParams",
  //   "$resource",
  //   RecipeNewControllerFunction
  // ])
  .controller("RecipeEditController", [
    "CategoryFactory",
    "RecipeFactory",
    "IngredientFactory",
    "$stateParams",
    "$resource",
    "$state",
    RecipeEditControllerFunction
  ]);

    function RouterFunction($stateProvider, $locationProvider){
      // $locationProvider.html5Mode(true);
      $stateProvider
      .state("categoryIndex", {
        url: "",
        templateUrl: "/views/categories/index.html",
        controller: "CategoryController",
        controllerAs: "vm"
      })
      .state("categoryShow", {
        url: "/:id",
        templateUrl: "/views/categories/show.html",
        controller: "CategoryShowController",
        controllerAs: "vm"
      })
      .state("recipeIndex", {
        url: "/recipes",
        templateUrl: "recipes/index.html.erb",
        controller: "RecipeIndexController",
        controllerAs: "RecipeIndexViewModel"
      })
      .state("recipeNew", {
        url: "/recipes/new",
        templateUrl: "recipes/new.html.erb",
        controller: "RecipeNewController",
        controllerAs: "vm"
      })
      .state("recipeEdit", {
        url: "/category/:category_id/recipes/:id/edit",
        templateUrl: "/views/recipes/edit.html",
        controller: "RecipeEditController",
        controllerAs: "vm"
      })
      .state("recipeShow", {
        url: "/category/:category_id/recipes/:id",
        templateUrl: "/views/recipes/show.html",
        controller: "RecipeShowController",
        controllerAs: "vm"
      })
      // .state("ingredientIndex", {
      //   url: "/ingredients",
      //   templateUrl: "ingredients/index.html.erb",
      //   controller: "ingredient_controller",
      //   controllerAs: "IngredientIndexViewModel"
      // })
      // .state("ingredientEdit", {
      //   url: "/ingredients/:id/edit",
      //   templateUrl: "ingredients/edit.html.erb",
      //   controller: "IngredientEditController",
      //   controllerAs: "IngredientEditViewModel"
      // })
      // .state("ingredientShow", {
      //   url: "/ingredients/:id",
      //   templateUrl: "ingredients/show.html.erb",
      //   controller: "IngredientShowController",
      //   controllerAs: "IngredientShowViewModel"
      // });
  }
//Index all the Categories
  function CategoryController($resource, CategoryFactory, $http, $state){
    var vm = this;
    vm.category_data = {}
//Get categories from the database
    var Category = $resource("/categories/:id.json", {}, {
      update: {method: "PUT"}
    });
    vm.category_data = CategoryFactory.query();

//Delete a Category
    vm.destroy = function(cat){
      console.log("index"+JSON.stringify(cat))
      Category.remove({id: cat.id}, function(response){
        if(response.success) vm.category_data.splice(vm.category_data.indexOf(cat), 1);
      });
    }

//Create a Category throw an error if name is blank
       vm.new_category = new CategoryFactory();
       vm.create = function(){
          if (vm.new_category.Cat_name){
             Category.save(vm.new_category, function(response){
               if(response.success) vm.catgory_data.push(response);
               vm.new_catgory = new CategoryFactory();
             })
             vm.category_data.push(angular.copy(vm.new_category));
          }else{
             alert("Category can not be blank!!");
          }
          vm.new_category = {};
       }

//Edit Category
    vm.update = function(category){
      Category.update({id: category.id}, category, function(response){
        category.showEdit = !category.showEdit
      });
    }

//got search working in a rails only app will integrate in future
    // vm.search = function(searchparams){
    //   $http({
    //          method: "JSONP",
    //          url: "http//food2fork.com/api/search?key={API_KEY}&q=shredded%20chicken",
    //          headers: {
    //              "Accept": "application/jsonp"
    //          }
    //        }).then(function successCallback(response) {
    //                console.log(response);
    //          }, function errorCallback(response) {
    //            console.log(response);
    //          });
    // }
  }

  function CategoryFactoryFunction($resource) {
    return $resource("/categories/:id.json", {}, {
      update: {method: "PUT"}
    });
  }


  function CategoryShowControllerFunction(CategoryFactory, RecipeFactory, IngredientFactory, $stateParams, $resource, $state){
    console.log("in the category show controller")
    var vm = this;
    var Recipe = $resource("/recipes/:id.json", {}, {
        update: {method: "PUT"}
      });
    console.log("vm "+vm[0])
    console.log("state params "+$stateParams)
    console.log("resource "+$resource)
    console.log("id"+$stateParams.id)
    CategoryFactory.get({id: $stateParams.id}).$promise.then(function(category) {
      vm.category = category
      console.log("category"+JSON.stringify(category))
    })
    // vm.recipes = RecipeFactory.query({category_id: $stateParams.id})
    // console.log("recipe "+ vm.recipes)
    //   // this.update = function(category){
    //   //   category.$update(category);
    //   // }

    RecipeFactory.query({category_id: $stateParams.id}).$promise.then(function(recipes){
      vm.recipes = recipes
      console.log("recipe "+JSON.stringify(recipes))
      // this.update = function(category){
      //   category.$update(category);
      // }
    })



      vm.update = function(recipe){
        console.log("recipe update recipe"+ recipe)
        Recipe.update({id: recipe.id}, recipe, function(response){
          console.log ("Recipe Update response "+response)
        })
      }



        vm.destroy = function(recipe_index){
          console.log("id "+$stateParams.id)
          console.log("index "+vm.recipes[recipe_index])
          var recipe = vm.recipes[recipe_index]
          Recipe.remove({id: recipe.id})
          vm.recipes.splice(recipe_index, 1)

        }



//Add a new recipe must reload vm.recipes through recipe factory after add update with new Ingredient ID
    vm.new_recipe = new RecipeFactory(); //{category_id: $stateParams.id});
    console.log("ID"+$stateParams.id)
    console.log("NEW RECIPE "+JSON.stringify(vm.new_recipe))
//Create new recipe
     vm.create = function(){
       console.log("in create function!")
      console.log("recipe title "+vm.new_recipe.title)
//Recipe must have a title
        if (vm.new_recipe.title) {
// Add new Recipe to database
           vm.new_recipe.$save({category_id: $stateParams.id}, function(response){
           console.log("IN SAVE NEW")
           console.log("response "+response)
// New Recipe Id is not Accessible - update vm.recipes so it contains the new recipe
           RecipeFactory.query({category_id: $stateParams.id}).$promise.then(function(recipes){
             vm.recipes = recipes
             console.log("recipes after add "+JSON.stringify(recipes))
            //  var sortedData= array .sort((function (a, b) {
            //                   return new Date(b.date) - new Date(a.date)
            //                 }));
// Take the Recipes and Sort them by Date so the Newest Recipe is Last - capture the new newRecipe in newRecipes sorted array
             var newRecipes = recipes.sort(function(a,b){return new Date(a.created_at) - new Date(b.created_at)});
             var newRecipe = {}
             newRecipe = newRecipes[recipes.length - 1]
             console.log("recipe id"+JSON.stringify(newRecipe))
             console.log("SORTED RECIPES"+JSON.stringify(newRecipes))
// Now that we know the ID of the newly created recipe we can add ingredients which contain the foreign key recipe_id - redirect to edit where you can add update delete ingredients
             $state.go("recipeEdit", {id: newRecipe.id, category_id: $stateParams.id}, {reload: true})
           })
//  if(response.success) vm.recipes.push(response) - update angular table to reflect new recipe on screen
           vm.new_recipe = new RecipeFactory(); //{category_id: $stateParams.id});
           console.log("ID"+$stateParams.id)
           console.log("NEW RECIPE "+vm.new_recipe)
         })
         vm.recipes.push(angular.copy(vm.new_recipe));
       } else {
         alert("Recipe name can not be blank!!");
       }
         vm.new_recipe = {};
         vm.ingredients = {}
       }
  }
  function RecipeFactoryFunction($resource) {
    // console.log()
    // return $resource("/categories/" + $stateParams.id + "/recipes/:id.json", {}, {
    return $resource("/categories/:category_id/recipes/:id.json", {}, {
      update: {method: "PUT"}
    });
  }


  // function CreateRecipeFactoryFunction($resource) {
  //   // console.log()
  //   return $resource("/categories/" + $stateParams.id + "/recipes/:id.json", {}, {
  //     update: {method: "PUT"}
  //   });
  // }

  function RecipeController($resource, RecipeFactory){
    var vm = this;
    var Recipe = $resource("/recipes/:id.json", {}, {
      update: {method: "PUT"}
    });
    vm.recipe_data = Recipe.query()
    console.log("recipe-data "+vm.recipe_data)


    vm.sort_recipe_data_by = function(name){
      vm.sort_on = name;
      vm.is_descending = !(vm.is_descending);
    }

    // vm.destroy = function(recipe_index){
    //   var recipe = vm.recipe_data[recipe_index];
    //   Recipe.remove(recipe_index, function(response){
    //     if(response.success) vm.recipe_data.splice(recipe_index, 1);
    //   });
  //  }

    vm.update = function(recipe){
      Recipe.update({id: recipe.id}, recipe, function(response){
        console.log("Recipe updated!");
      });
    }
  }
  function RecipeShowControllerFunction(CategoryFactory, RecipeFactory, IngredientFactory, $stateParams, $resource, $state){
    console.log("in the recipe show controller")
    var vm = this;
    console.log("vm "+vm[0])
    console.log("this "+this)
    console.log("cat id"+$stateParams.category_id)
    console.log("id"+$stateParams.id)
    CategoryFactory.get({id: $stateParams.category_id}).$promise.then(function(category) {
      vm.category = category
      console.log("category"+category)
    })
    RecipeFactory.get({category_id: $stateParams.category_id, id: $stateParams.id }).$promise.then(function(recipe) {
      vm.recipe = recipe
      console.log("category"+recipe)
    })
    // IngredientFactory.query({recipe_id: $stateParams.id}).$promise.then(function(ingredients){
    //   vm.ingredients = ingredients
    //   console.log("recipe "+JSON.stringify(ingredients)
    // console.log("ingredients "+vm.ingredients)
    vm.ingredients = IngredientFactory.query({recipe_id: $stateParams.id})
    console.log("ingredients "+vm.ingredients)
    var Ingredient = $resource("/ingredients/:id.json", {}, {
        update: {method: "PUT"}
      });

      vm.update = function(ing){
        console.log("UPDATEINGREDIENT"+JSON.stringify(ing))
        Ingredient.update({id: ing.id}, ing, function(response){
          // ingredient.showEdit = !ingredient.showEdit
        });
        console.log("cat id"+$stateParams.category_id)
        console.log("recipe id"+ing.recipe_id)
      }

    vm.destroy = function(ing){
      console.log("index"+JSON.stringify(ing))
      Ingredient.remove({id: ing.id}, function(response){
        if(response.success) vm.ingredients.splice(vm.ingredients.indexOf(ing), 1);
      });
    }


    // this.destroy = function(recipe_index){
    //   console.log("catid "+$stateParams.category_id)
    //   console.log("id "+$stateParams.id)
    //   console.log("index "+recipe_index)
    //   console.log("this recipe = "+this.recipe)
    //   RecipeFactory.remove(recipe_index);
    //   this.recipe.splice(recipe_index, 1)
    // }
    // vm.destroy = function($Index){
    //   RecipeFactory.remove(category_id: $stateParams.category_id, id: $stateParams.id);
    //   vm.recipe.splice(id: $stateParams.id, 1)
    // }
    vm.new_ingredient = new IngredientFactory(); //{category_id: $stateParams.id});
    console.log("ID"+$stateParams.id)
    console.log("IDr"+$stateParams.recipe_id)
    console.log("NEW INGREDIENT "+JSON.stringify(vm.new_ingredient))
     vm.create = function(){
     console.log("NEWINGREDIENT "+JSON.stringify(vm.new_ingredient.component))
        vm.new_ingredient.$save({recipe_id: $stateParams.id}, function(response){
        vm.ingredients = IngredientFactory.query({recipe_id: $stateParams.id})
       console.log("RESPONSE "+JSON.stringify(response))
        if(response.success) vm.new_ingredient.push(response);
           vm.new_ingredient = new IngredientFactory();
         })
     console.log("NEWINGREDIENT 2 "+JSON.stringify(vm.new_ingredient))
     vm.ingredients.push(angular.copy(vm.new_ingredient))
     console.log("VM.INGREDIENTS "+JSON.stringify(vm.ingredients))
     vm.new_ingredient = {}
    }
  }
  function IngredientFactoryFunction($resource) {
    return $resource("/recipes/:recipe_id/ingredients/:id.json", {}, {
      update: {method: "PUT"}
    })
  }


  function RecipeEditControllerFunction(CategoryFactory, RecipeFactory, IngredientFactory, $stateParams, $resource, $state){
      console.log("in the recipe edit controller")
      var vm = this;
      console.log("vm "+vm[0])
      console.log("this "+this)
      console.log("cat id"+$stateParams.category_id)
      console.log("id"+$stateParams.id)
      // CategoryFactory.get({category_id: $stateParams.category_id}).$promise.then(function(category) {
      //   vm.category = category
      //   console.log("category"+category)
      // })
      RecipeFactory.get({category_id: $stateParams.category_id, id: $stateParams.id }).$promise.then(function(recipe) {
        vm.recipe = recipe
        console.log("category"+JSON.stringify(recipe))
      })

      vm.ingredients = IngredientFactory.query({recipe_id: $stateParams.id})
      console.log("ingredients "+vm.ingredients)
      var Ingredient = $resource("/ingredients/:id.json", {}, {
          update: {method: "PUT"}
        });


      vm.updateRecipe = function(recipe){
        console.log(" update ID"+JSON.stringify($stateParams.id))
        console.log(" update catID"+JSON.stringify($stateParams.category_id))

        vm.recipe.$update({category_id: $stateParams.category_id, id: $stateParams.id}), function(response){
          console.log("updated")

        }
      }



      //  vm.new_ingredient = new IngredientFactory(); //{category_id: $stateParams.id});
      //  console.log("ID"+$stateParams.id)
      //  console.log("IDr"+$stateParams.recipe_id)
      //  console.log("NEW INGREDIENT "+JSON.stringify(vm.new_ingredient))
      //   vm.create = function(){
      //         vm.new_ingredient.$save({recipe_id: $stateParams.id}, function(response){
      //           if(response.success) vm.new_ingredient.push(response);
      //           vm.new_ingredient = new IngredientFactory();
      //         })
      //         vm.ingredients.push(angular.copy(vm.new_ingredient))
      //         vm.new_ingredient = {}
      //   }



        vm.new_ingredient = new IngredientFactory(); //{category_id: $stateParams.id});
        console.log("ID"+$stateParams.id)
        console.log("IDr"+$stateParams.recipe_id)
        console.log("NEW INGREDIENT "+JSON.stringify(vm.new_ingredient))
         vm.create = function(){
         console.log("NEWINGREDIENT "+JSON.stringify(vm.new_ingredient.component))
            vm.new_ingredient.$save({recipe_id: $stateParams.id}, function(response){
           vm.ingredients = IngredientFactory.query({recipe_id: $stateParams.id})
           console.log("RESPONSE "+JSON.stringify(response))
            if(response.success) vm.new_ingredient.push(response);
               vm.new_ingredient = new IngredientFactory();
             })
         console.log("NEWINGREDIENT 2 "+JSON.stringify(vm.new_ingredient))
         vm.ingredients.push(angular.copy(vm.new_ingredient))
         console.log("VM.INGREDIENTS "+JSON.stringify(vm.ingredients))
         vm.new_ingredient = {}
        }
        // vm.recipe.$update({category_id: $stateParams.category_id, id: $stateParams.id}).then(function(response){
        //   console.log("updated")
        //   $state.go("categoryIndex", {}, {reload: true});
        // })

      // vm.destroy = function(index){
      //   RecipeFactory.remove(index)
      //   vm.recipe.splice(index, 1)
      // }

        vm.updateIngredient = function(ing){
          console.log("UPDATEINGREDIENT"+JSON.stringify(ing))
          Ingredient.update({id: ing.id}, ing, function(response){
            // ingredient.showEdit = !ingredient.showEdit
          });
          console.log("cat id"+$stateParams.category_id)
          console.log("recipe id"+ing.recipe_id)
        }

      vm.destroy = function(ing){
        console.log("index"+JSON.stringify(ing))
        Ingredient.remove({id: ing.id}, function(response){
          if(response.success) vm.ingredients.splice(vm.ingredients.indexOf(ing), 1);
        })
      }

 }


})(); // closes Main IFFEE
