"use strict";

(function(){
  angular
  .module("categories", ["ngResource"])
  .factory("CategoryFactory", [
    "$resource",
    CategoryFactoryFunction
  ]);

  function CategoryFactoryFunction($resource) {
    return $resource("http://localhost:3000/categories/:id.json", {}, {
      update: {method: "PUT"}
    });
  }
}());
