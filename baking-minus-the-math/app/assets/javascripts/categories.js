//= require angular
//= require angular-resource

"use strict";

(function(){
  angular
  .module("categories", ["ngResource"])
  .controller("category_index_controller", ["$resource", "CategoryFactory", CategoryController]);

  function CategoryController($resource, CategoryFactory){
    var vm = this;
    var Category = $resource("/categories/:id.json", {}, {
      update: {method: "PUT"}
    });
    vm.category_data = Category.query();

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
})();
