"use strict";

(function(){
  angular
  .module("recipes")
  .factory("RecipeFactory", [
    "$resource",
    RecipeFactoryFunction
  ]);

  function RecipeFactoryFunction($resource) {
    return $resource("http://localhost:3000/categories/:category_id/recipes/:id.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
