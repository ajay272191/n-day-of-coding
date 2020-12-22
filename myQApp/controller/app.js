var myApp = angular.module('mainApp', ['ngRoute']);

myApp.config(function($routeProvider) {
  $routeProvider
  .when("/", {
    templateUrl : "app.html"
  })
  .when('/mathemetics', {
    templateUrl: 'mathemetics.html'
  })
  .when('/physics', {
    templateUrl: 'physics.html'
  })
  .when('/chemistry', {
    templateUrl: 'chemistry.html'
  })
  .when('/english', {
    templateUrl: 'english.html'
  })
  .otherwise({
    redirectTo: '/'

  });
});

finalAns = {};

myApp.controller('submission_ctrl',function($scope, $window, $timeout, $interval){
    $scope.test_time = 20//1*60*60; //time in seconds
    var interval ;
    $scope.test_time_h = Math.floor($scope.test_time/(60*60));
    $scope.test_time_m = Math.floor($scope.test_time%(60*60)/60);
    $scope.test_time_s = Math.floor($scope.test_time%(60));
    $scope.submit_ans = function(){
        console.log("finalAns is: ");
        console.log(finalAns);
        $interval.cancel(interval);
        $window.location.href = '#'
    }
    $scope.start_timer = function() {
      interval = $interval(function() {
        $scope.test_time--;
        $scope.test_time_h = Math.floor($scope.test_time/(60*60));
        $scope.test_time_m = Math.floor($scope.test_time%(60*60)/60);
        $scope.test_time_s = Math.floor($scope.test_time%(60));

        if($scope.test_time == 0){
          $scope.submit_ans();
        }
      }, 1000, $scope.test_time);
    }
})


myApp.controller('profile_info', function($scope, $interval){
    var user = {
      "username": "ajay123",
      "age": 24,
      "imgUrl":"./assets/profile.jpg"
    };
    var profile_image =  `src = "` + user.imgUrl + `"`
    $scope.user = user;
    $interval(function() {
      var time = new Date().toLocaleTimeString();
      $scope.time = time;
    }, 1000);

})

myApp.controller('subject_info', function($scope, $http){
  $http.get("http://127.0.0.1:3000/assets/subjects.json")
  .then(function(response){
    $scope.subjects = response.data;
  });
})


myApp.controller("mq_controller", function($scope, $http) {

    $http.get("http://127.0.0.1:3000/assets/mathemetics.json")
    .then(function(response){
      $scope.questions = response.data.questions;
      // console.log("total questions");
      // console.log($scope.questions);
      for(var i = 0; i< $scope.questions.length; i++){
        for(key in finalAns){
          if($scope.questions[i].questionId === key){
            $scope.questions[i].options = finalAns[key];
          }
        }
      }

      $scope.question_id = $scope.questions[0].questionId;
      $scope.current_id = $scope.questions[0].index;
      $scope.current_question = $scope.questions[0].question;
      $scope.current_options = $scope.questions[0].options;

      $scope.next = function(){
          var i = $scope.getIndex($scope.current_id, 1);
          $scope.question_id = $scope.questions[i].questionId;
          $scope.current_id = $scope.questions[i].index;
          $scope.current_question = $scope.questions[i].question;
          $scope.current_options = $scope.questions[i].options;
      };
      $scope.previous = function(){
          var i = $scope.getIndex($scope.current_id, -1);
          $scope.question_id = $scope.questions[i].questionId;
          $scope.current_id = $scope.questions[i].index;
          $scope.current_question = $scope.questions[i].question;
          $scope.current_options = $scope.questions[i].options;
      };
      $scope.getIndex = function(currentIndex, shift){
          var len = $scope.questions.length;
          return (((currentIndex + shift) + len) % len)
      }

      $scope.modifyOption = function(){
        var x = $scope.question_id;
        finalAns[x] = $scope.current_options;
      }

    });
 });

    myApp.controller("pq_controller", function($scope, $http) {
        $http.get("http://127.0.0.1:3000/assets/physics.json")
        .then(function(response){
          $scope.questions = response.data.questions;

          for(var i = 0; i< $scope.questions.length; i++){
            for(key in finalAns){
              if($scope.questions[i].questionId === key){
                $scope.questions[i].options = finalAns[key];
              }
            }
          }

          $scope.question_id = $scope.questions[0].questionId;
          $scope.current_id = $scope.questions[0].index;
          $scope.current_question = $scope.questions[0].question;
          $scope.current_options = $scope.questions[0].options;

          $scope.next = function(){
              var i = $scope.getIndex($scope.current_id, 1);
              $scope.question_id = $scope.questions[i].questionId;
              $scope.current_id = $scope.questions[i].index;
              $scope.current_question = $scope.questions[i].question;
              $scope.current_options = $scope.questions[i].options;
          };

          $scope.previous = function(){
              var i = $scope.getIndex($scope.current_id, -1);
              $scope.question_id = $scope.questions[i].questionId;
              $scope.current_id = $scope.questions[i].index;
              $scope.current_question = $scope.questions[i].question;
              $scope.current_options = $scope.questions[i].options;
          };

          $scope.getIndex = function(currentIndex, shift){
              var len = $scope.questions.length;
              return (((currentIndex + shift) + len) % len)
          }

          $scope.modifyOption = function(){
            var x = $scope.question_id;
            finalAns[x] = $scope.current_options;
          }

        });
      });


        myApp.controller("cq_controller", function($scope, $http) {
            $http.get("http://127.0.0.1:3000/assets/chemistry.json")
            .then(function(response){
              $scope.questions = response.data.questions;
              for(var i = 0; i< $scope.questions.length; i++){
                for(key in finalAns){
                  if($scope.questions[i].questionId === key){
                    $scope.questions[i].options = finalAns[key];
                  }
                }
              }

              $scope.question_id = $scope.questions[0].questionId;
              $scope.current_id = $scope.questions[0].index;
              $scope.current_question = $scope.questions[0].question;
              $scope.current_options = $scope.questions[0].options;

              $scope.next = function(){
                  var i = $scope.getIndex($scope.current_id, 1);
                  $scope.question_id = $scope.questions[i].questionId;
                  $scope.current_id = $scope.questions[i].index;
                  $scope.current_question = $scope.questions[i].question;
                  $scope.current_options = $scope.questions[i].options;
              };

              $scope.previous = function(){
                  var i = $scope.getIndex($scope.current_id, -1);
                  $scope.question_id = $scope.questions[i].questionId;
                  $scope.current_id = $scope.questions[i].index;
                  $scope.current_question = $scope.questions[i].question;
                  $scope.current_options = $scope.questions[i].options;
              };

              $scope.getIndex = function(currentIndex, shift){
                  var len = $scope.questions.length;
                  return (((currentIndex + shift) + len) % len)
              }

              $scope.modifyOption = function(){
                var x = $scope.question_id;
                finalAns[x] = $scope.current_options;
              }

            });

          });


            myApp.controller("eq_controller", function($scope, $http) {
                $http.get("http://127.0.0.1:3000/assets/english.json")
                .then(function(response){
                  $scope.questions = response.data.questions;
                  // console.log("total questions");
                  // console.log($scope.questions);
                  for(var i = 0; i< $scope.questions.length; i++){
                    for(key in finalAns){
                      if($scope.questions[i].questionId == key){
                        $scope.questions[i].options = finalAns[key];
                      }
                    }
                  }

                  $scope.question_id = $scope.questions[0].questionId;
                  $scope.current_id = $scope.questions[0].index;
                  $scope.current_question = $scope.questions[0].question;
                  $scope.current_options = $scope.questions[0].options;

                  $scope.next = function(){
                      var i = $scope.getIndex($scope.current_id, 1);
                      $scope.question_id = $scope.questions[i].questionId;
                      $scope.current_id = $scope.questions[i].index;
                      $scope.current_question = $scope.questions[i].question;
                      $scope.current_options = $scope.questions[i].options;
                  };

                  $scope.previous = function(){
                      var i = $scope.getIndex($scope.current_id, -1);
                      $scope.question_id = $scope.questions[i].questionId;
                      $scope.current_id = $scope.questions[i].index;
                      $scope.current_question = $scope.questions[i].question;
                      $scope.current_options = $scope.questions[i].options;
                  };

                  $scope.getIndex = function(currentIndex, shift){
                      var len = $scope.questions.length;
                      return (((currentIndex + shift) + len) % len)
                  }

                  $scope.modifyOption = function(){
                    var x = $scope.question_id;
                    finalAns[x] = $scope.current_options;
                  }
                });

              });
