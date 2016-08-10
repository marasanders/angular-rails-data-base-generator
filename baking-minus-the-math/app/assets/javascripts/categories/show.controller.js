"use strict";

(function(){
  angular
    .module("categories", ["ngResource"])
    .controller("CategoryShowController", [
      "CategoryFactory",
      "RecipeFactory",
      "$stateParams",
      "$resource",
      CategoryShowControllerFunction
    ]);

  function CategoryShowControllerFunction(CategoryFactory, RecipeFactory, $stateParams, $resource){
    console.log("in the category show controller")
    var vm = this;
    console.log("vm "+vm)
    console.log("this "+this)
    CategoryFactory.get({id: $stateParams.id}).$promise.then(function(category) {
      vm.category = category
    })
    this.recipes = RecipeFactory.query({category_id: $stateParams.id})
    this.update = function(category){
      category.$update(category);
    }
    this.destroy = function(category){
      console.log(category)
      CategoryFactory.remove(category);
      this.category.splice(category, 1)
    }
  }
})();
