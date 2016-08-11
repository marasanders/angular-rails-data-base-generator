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
    CategoryController
  ])
  .controller("CategoryShowController", [
    "CategoryFactory",
    "RecipeFactory",
    "$stateParams",
    "$resource",
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
    RecipeShowControllerFunction
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
      .state("categoryEdit", {
        url: "/categories/:id/edit",
        templateUrl: "categories/edit.html.erb",
        controller: "CategoryEditController",
        controllerAs: "CategoryEditViewModel"
      })
      .state("recipeIndex", {
        url: "/recipes",
        templateUrl: "recipes/index.html.erb",
        controller: "RecipeIndexController",
        controllerAs: "RecipeIndexViewModel"
      })
      // .state("recipeNew", {
      //   url: "/recipes/new",
      //   templateUrl: "recipes/new.html.erb",
      //   controller: "recipe_new_controller",
      //   controllerAs: "RecipeNewViewModel"
      // })
      // .state("recipeEdit", {
      //   url: "/recipes/:id/edit",
      //   templateUrl: "recipes/edit.html.erb",
      //   controller: "RecipeEditController",
      //   controllerAs: "RecipeEditViewModel"
      // })
      .state("recipeShow", {
        url: "/recipes/:id",
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

  function CategoryController($resource, CategoryFactory){
    var vm = this;
    var Category = $resource("/categories/:id.json", {}, {
      update: {method: "PUT"}
    });
    vm.category_data = CategoryFactory.query();

    vm.sort_category_data_by = function(name){
      vm.sort_on = name;
      vm.is_descending = !(vm.is_descending);
    }


    vm.destroy = function(category_index){
      var category = vm.category_data[category_index];
      Category.remove(category_index, function(response){
        if(response.success) vm.category_data.splice(category_index, 1);
      });
    }

    vm.update = function(category){
      Category.update({id: category.id}, category, function(response){
        console.log("Category updated!");
      });
    }
  }

  function CategoryFactoryFunction($resource) {
    return $resource("/categories/:id.json", {}, {
      update: {method: "PUT"}
    });
  }

  function CategoryShowControllerFunction(CategoryFactory, RecipeFactory, $stateParams, $resource){
    console.log("in the category show controller")
    var vm = this;
    console.log("vm "+vm[0])
    console.log("this "+this)
    console.log("id"+$stateParams.id)
    CategoryFactory.get({id: $stateParams.id}).$promise.then(function(category) {
      vm.category = category
      console.log("category"+category)
    })
    vm.recipes = RecipeFactory.query({category_id: $stateParams.id})
    console.log("recipe "+vm.recipes)
    this.update = function(category){
      category.$update(category);
    }
    this.destroy = function(category){
      CategoryFactory.remove(category);
      this.category.splice(category, 1)
    }
  }
  function RecipeFactoryFunction($resource) {
    return $resource("/categories/:category_id/recipes/:id.json", {}, {
      update: {method: "PUT"}
    });
  }
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

    // vm.comment = new CommentFactory();
    // vm.create = function(){
    //   this.comments = CommentFactory.query()
    //   vm.comment.$save(function(response){
    //     console.log(vm.comment)
    //     if(response.success) vm.com_data.push();
    //   });
    // }

    vm.destroy = function(recipe_index){
      var recipe = vm.recipe_data[recipe_index];
      Recipe.remove(recipe_index, function(response){
        if(response.success) vm.recipe_data.splice(recipe_index, 1);
      });
    }

    vm.update = function(recipe){
      Recipe.update({id: recipe.id}, recipe, function(response){
        console.log("Recipe updated!");
      });
    }
  }
  function RecipeShowControllerFunction(CategoryFactory, RecipeFactory, IngredientFactory, $stateParams, $resource){
    console.log("in the recipe show controller")
    var vm = this;
    console.log("vm "+vm[0])
    console.log("this "+this)
    console.log("cat id"+$stateParams.category_id)
    console.log("id"+$stateParams.id)
    CategoryFactory.get({category_id: $stateParams.id}).$promise.then(function(category) {
      vm.category = category
      console.log("category"+category)
    })
    RecipeFactory.get({id: $stateParams.id}).$promise.then(function(recipe) {
      vm.recipe = recipe
      console.log("category"+recipe)
    })
    vm.ingredients = IngredientFactory.query({recipe_id: $stateParams.id})
    console.log("ingredients "+vm.ingredients)
    this.update = function(recipe){
      category.$update(recipe);
    }
    this.destroy = function(recipe){
      CategoryFactory.remove(recipe);
      this.category.splice(recipe, 1)
    }
  }
  function IngredientFactoryFunction($resource) {
    return $resource("/recipes/:recipe_id/ingredients/id:.json", {}, {
      update: {method: "PUT"}
    });
  }



})(); // closes Main IFFEE
