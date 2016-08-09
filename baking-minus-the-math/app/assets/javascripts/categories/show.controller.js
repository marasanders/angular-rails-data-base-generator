"use strict";

(function(){
  angular
    .module("categories")
    .controller("CatergoryShowController", [
      "CatergoryFactory",
      "RecipeFactory",
      "recipes",
      "$stateParams",
      CatergoryShowControllerFunction
    ]);

  function CatergoryShowControllerFunction(CatergoryFactory, RecipeFactory, $stateParams){
    var vm = this;
    CatergoryFactory.get({id: $stateParams.id}).$promise.then(function(category) {
      vm.category = category
    })
    this.recipes = RecipeFactory.query({category_id: $stateParams.id})
    this.update = function(category){
      category.$update(category);
    }
    this.destroy = function(category){
      console.log(category)
      CatergoryFactory.remove(category);
      this.category.splice(category, 1)
    }
  }
})();
