$(function() {
    $(".devourBtn").on("click", function(event) {
      var id = $(this).data("id");
      var newDevour= $(this).data(true);
    console.log( $(this).data);
      var newDevourState = {
        devoured: newDevour
      };
  
      $.ajax("/api/burger/" + id, {
        type: "PUT",
        data: newdevourState
      }).then(
        function() {
          console.log("changed devoured to", newDevour);
          location.reload();
        }
      );
    });
  
    $(".create-form").on("submit", function(event) {
      event.preventDefault();
  
      var newBurger = {
        name: $("#addBurger").val(),
      };
  
      $.ajax("/api/burger", {
        type: "POST",
        data: newBurger
      }).then(
        function() {
          console.log("made new burger to eat");
          location.reload();
        }
      );
    });
  
    $(".removeBurger").on("click", function(event) {
      var id = $(this).data("id");
  
      $.ajax("/api/burger/" + id, {
        type: "DELETE",
      }).then(
        function() {
          console.log("deleted burger", id);
          location.reload();
        }
      );
    });
  });
  