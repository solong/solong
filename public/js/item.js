var app = angular.module('wantedItem', [ 'wantedDialog', 'wantedDelete' ]);
app.directive('wantedItem', function() {
  return {
    restrict : 'A',
    scope : {
      steamId : '=steamId',
      mySteamId : '=mySteamId',
    },
    templateUrl : '/assets/templates/item.html',
    controller : [ '$scope', '$http','$window', function($scope, $http,$window) {
      $scope.addDetail = function() {
        url = '/api/addDetail/' + $scope.proposedDetail.wantedId;
        $http.post(url, $scope.proposedDetail).success(function(data) {
        }).error(function(data, status, headers, config) {
          // TODO: Error
          // handling for add
          // detail
        });
      }

      $scope.selectedState = [ 1, 2 ];
      $scope.adjustFilter = function(filter) {
        filter.value = !filter.value;
        if (filter.value) {
          $scope.selectedState.push(filter.key);
        } else {
          $scope.currentPage = 0;
          var index = $scope.selectedState.indexOf(filter.key);
          $scope.selectedState.splice(index, 1);
        }
      }
      $scope.filter = {
        "obtained" : {
          "value" : false,
          "key" : 3
        },
        "unobtained" : {
          "value" : true,
          "key" : 1
        },
        "unwanted" : {
          "value" : false,
          "key" : 0
        },
        "unknown" : {
          "value" : true,
          "key" : 2
        },
      }

      $scope.proposedDetail = {
        "wantedId" : 1,
        "details" : {
          "quality" : -1,
          "levelNumber" : 1,
          "isTradable" : 1,
          "isCraftable" : 1,
          "craftNumber" : 0,
          "isGiftWrapped" : 0,
          "price" : "ASK",
          "isObtained" : 0,
          "priority" : 0
        }
      };

      $scope.removeDetailFromModel = function(detailId) {
        for ( var i = 0; i < $scope.items.length; i++) {
          for ( var j = 0; j < $scope.items[i].details.length; j++) {
            if ($scope.items[i].details[j].detailId == detailId) {
              $scope.items[i].details.splice(j, 1);
            }
          }
        }
        ;
      };

      $scope.pushPriorityToModel = function(detailId, priority) {
        for ( var i = 0; i < $scope.items.length; i++) {
          for ( var j = 0; j < $scope.items[i].details.length; j++) {
            if ($scope.items[i].details[j].detailId == detailId) {
              $scope.items[i].details[j].priority = priority;
            }
          }
        }
        ;

      };


      $scope.isNumber = function(text){
        if (text=="None") return true;
      }
      $scope.pushMarkAsToModel = function(detailId, state) {
        for ( var i = 0; i < $scope.items.length; i++) {
          for ( var j = 0; j < $scope.items[i].details.length; j++) {
            if ($scope.items[i].details[j].detailId == detailId) {
              $scope.items[i].details[j].isObtained = state;
            }
          }
        }
        ;
      }




      $scope.wiki = function(itemId) {

        $window.open('http://wiki.teamfortress.com/scripts/itemredirect.php?id='+itemId+'&lang=en_US');


      }

      $scope.pushStateChangeToModel = function(wantedId, state) {
        for ( var i = 0; i < $scope.items.length; i++) {
          if ($scope.items[i].wantedId == wantedId) {
            $scope.items[i].state = state;
            $scope.items[i].recentlyChanged = 1;
          }
        }
        ;
      };

      $scope.pushDetailToModel = function(wantedId, details) {
        for ( var i = 0; i < $scope.items.length; i++) {
          if ($scope.items[i].wantedId == wantedId) {
            $scope.items[i].details.push(details);
          }
        }
        ;
      };

      $scope.showAddDetail = function(wantedId) {
        $scope.proposedDetail.wantedId = wantedId;
      };

      $scope.showDeleteDetail = function(detailId) {
        $scope.proposedDetailDelete = detailId;
      };

      $scope.qualities = [ {
        "id" : "0",
        "name" : "Stock",
        "shortName" : "S",
        "css" : "normal",
      }, {
        "id" : "1",
        "name" : "Genuine",
        "shortName" : "G",
        "css" : "genuine",
      }, {
        "id" : "3",
        "name" : "Vintage",
        "shortName" : "V",
        "css" : "vintage",
      }, {
        "id" : "5",
        "name" : "Unusual",
        "shortName" : "U",
        "css" : "unusual",
      }, {
        "id" : "6",
        "name" : "Unique",
        "shortName" : "U",
        "css" : "unique",
      }, {
        "id" : "7",
        "name" : "Community",
        "shortName" : "C",
        "css" : "community",
      }, {
        "id" : "8",
        "name" : "Valve",
        "shortName" : "V",
        "css" : "valve",
      }, {
        "id" : "9",
        "name" : "Self-Made",
        "shortName" : "S",
        "css" : "selfmade",
      }, {
        "id" : "11",
        "name" : "Strange",
        "shortName" : "S",
        "css" : "strange",
      }, {
        "id" : "13",
        "name" : "Haunted",
        "shortName" : "H",
        "css" : "haunted",
      }, {
        "id" : "-1",
        "name" : "Any Quality",
        "shortName" : "?",
        "css" : "default",
      } ];


      $scope.qualityIdToClassForLabel = function(qualityId) {
        for ( var i = 0; i < ($scope.qualities).length; i++) {
          if ($scope.qualities[i].id == qualityId) {
            return "label label-"+$scope.qualities[i].css;
          }
        }
      }

      $scope.tradable = [ {
        "id" : "0",
        "name" : "Untradable",
        "clazz" : "glyphicon glyphicon-remove"
      }, {
        "id" : "1",
        "name" : "Tradable",
        "clazz" : "glyphicon glyphicon-ok-sign"
      }, {
        "id" : "2",
        "name" : "Don't care",
        "clazz" : "glyphicon glyphicon-question-sign"
      } ];

      $scope.tradableToString = function(tradable) {
        for ( var i = 0; i < ($scope.tradable).length; i++) {
          if ($scope.tradable[i].id == tradable) {
            return $scope.tradable[i].name;
          }
        }
      };

      $scope.tradableToClass = function(tradable) {
        for ( var i = 0; i < ($scope.tradable).length; i++) {
          if ($scope.tradable[i].id == tradable) {
            return $scope.tradable[i].clazz;
          }
        }
      };

      $scope.markAs = function(wantedId, state) {
        url = '/api/markAs/' + wantedId + '/' + state;
        $http.post(url).success(function(data) {
          $scope.pushStateChangeToModel(wantedId, state);
        }).error(function(data, status, headers, config) {
          // TODO: Error
          // handling for add
          // detail
        });
      }

      $scope.setPriority = function(detailId, priority) {
          url = '/api/priority/' + detailId + '/' + priority;
          $http.post(url).success(function(data) {
            $scope.pushPriorityToModel(detailId, priority);
          }).error(function(data, status, headers, config) {
            // TODO: Error
            // handling for add
            // detail
          });
      }

      $scope.markDetailAs = function(detailId, isObtained) {
        console.log(isObtained);
        url = '/api/markDetailAs/' + detailId + '/' + isObtained;
        $http.post(url).success(function(data) {
          $scope.pushMarkAsToModel(detailId, isObtained);
        }).error(function(data, status, headers, config) {
          // TODO: Error
          // handling for add
          // detail
        });
    }


      $scope.outpostSearch = function(itemId, level, quality) {
       if (level != 0 && quality != -1) { console.log("both"); indata = {"has1":"440,"+itemId+","+quality+"","filters":{"has1":{"ext":{"level":""+level}}}}; };
       if (level == 0 && quality != -1) { console.log("no level"); indata = {"has1":"440,"+itemId+","+quality+""}; };
       if (level != 0 && quality == -1) { console.log("noq uality"); indata = {"has1":"440,"+itemId+","+6+"","filters":{"has1":{"ext":{"level":""+level}}}}; };
       if (level == 0 && quality == -1) { console.log("neither"); indata = {"has1":"440,"+itemId+","+6+""}; };
        $("#outpostJson").val(JSON.stringify(indata));
        $('#outpostSubmit').click();


      }

      $scope.craftable = [ {
        "id" : "0",
        "name" : "Uncraftable",
        "clazz" : "glyphicon glyphicon-remove"
      }, {
        "id" : "1",
        "name" : "Craftable",
        "clazz" : "glyphicon glyphicon-ok-sign"
      }, {
        "id" : "2",
        "name" : "Don't care",
        "clazz" : "glyphicon glyphicon-question-sign"
      } ];

      $scope.craftableToString = function(craftable) {
        for ( var i = 0; i < ($scope.craftable).length; i++) {
          if ($scope.craftable[i].id == craftable) {
            return $scope.craftable[i].name;
          }
        }
      };

      $scope.craftableToClass = function(craftable) {
        for ( var i = 0; i < ($scope.craftable).length; i++) {
          if ($scope.craftable[i].id == craftable) {
            return $scope.craftable[i].clazz;
          }
        }
      };

      $scope.giftwrapped = [ {
        "id" : "0",
        "name" : "None",
        "clazz" : "glyphicon glyphicon-remove"
      }, {
        "id" : "1",
        "name" : "Wrapped",
        "clazz" : "glyphicon glyphicon-ok-sign"
      }, {
        "id" : "2",
        "name" : "Don't care",
        "clazz" : "glyphicon glyphicon-question-sign"
      } ];

      $scope.priority = [ {
        "id" : "0",
        "name" : "Low",
        "clazz" : "glyphicon glyphicon-arrow-down"
      }, {
        "id" : "1",
        "name" : "Medium",
        "clazz" : "glyphicon glyphicon-bell"
      }, {
        "id" : "2",
        "name" : "High",
        "clazz" : "glyphicon glyphicon-arrow-up"
      }, {
        "id" : "3",
        "name" : "Critical",
        "clazz" : "glyphicon glyphicon-exclamation-sign"
      } ];

      $scope.giftwrapToString = function(giftwrapped) {
        for ( var i = 0; i < ($scope.giftwrapped).length; i++) {
          if ($scope.giftwrapped[i].id == giftwrapped) {
            return $scope.giftwrapped[i].name;
          }
        }
      };

      $scope.giftwrapToClass = function(giftwrapped) {
        for ( var i = 0; i < ($scope.giftwrapped).length; i++) {
          if ($scope.giftwrapped[i].id == giftwrapped) {
            return $scope.giftwrapped[i].clazz;
          }
        }
      };

      $scope.priorityToString = function(priority) {
        if (priority == undefined) {
          priority = 0;
        }

        for ( var i = 0; i < ($scope.priority).length; i++) {
          if ($scope.priority[i].id == priority) {

            return $scope.priority[i].name;
          }
        }
      }

      $scope.priorityToClass = function(priority) {

        if (priority == undefined) {
          priority = 0;
        }

        for ( var i = 0; i < ($scope.priority).length; i++) {
          if ($scope.priority[i].id == priority) {

            return $scope.priority[i].clazz;

          }
        }
      }

      $scope.craftNumberToString = function(craftNumber) {
        if (craftNumber == -1) {
          return "Don't Care";
        } else if (craftNumber == 0) {
          return "None";
        } else {
          return "#" + craftNumber;
        }
        ;
      }

      $scope.tooBigToFit = function(text) {
        return text.length > 8;
      }
      $scope.levelToString = function(levelNumber) {
        if (levelNumber == 0) {
          return "Any";
        } else {
          return levelNumber;
        }
        ;
      }

      $scope.levelToClass = function(levelNumber) {
        if (levelNumber == 0) {
          return "glyphicon glyphicon-question-sign";
        } else {
          return levelNumber;
        }
        ;
      }

      $scope.craftNumberToClass = function(craftNumber) {
        if (craftNumber == -1) {
          return "glyphicon glyphicon-question-sign";
        } else if (craftNumber == 0) {
          return "glyphicon glyphicon-remove";
        } else {
          return "#" + craftNumber;
        }
        ;
      }

      $scope.qualityIdToString = function(inputId) {
        for ( var i = 0; i < ($scope.qualities).length; i++) {
          if ($scope.qualities[i].id == inputId) {
            return $scope.qualities[i].name;
          }
        }
      };

      $scope.qualityIdToShortString = function(inputId) {
        for ( var i = 0; i < ($scope.qualities).length; i++) {
          if ($scope.qualities[i].id == inputId) {
            return $scope.qualities[i].shortName;
          }
        }
      };

      $scope.currentPage = 0;
      $scope.pageSize = 10;
      $scope.numberOfPages = function() {
        return Math.ceil($scope.items.length / $scope.pageSize);
      }

      $scope.previous = function(currentPage) {
        if (currentPage > 0) {
          return $scope.currentPage--;
        } else {
          return $scope.currentPage;
        }
      };

      $scope.next = function(currentPage) {
        if (currentPage < $scope.numberOfPages()) {
          return $scope.currentPage++;
        } else {
          return $scope.currentPage;
        }
      };

      $scope.getWanted = function(steamId) {

        url = '/api/getWantedList/' + steamId;
        $http.get(url).success(function(data) {
          $scope.items = data.item;
        });
      };

    } ],

    link : function(scope, iElement, iAttrs) {
      // get weather details
      scope.getWanted(scope.steamId);
    },
  }
});
app.filter('startFrom', function() {
  return function(input, start) {
    if (input == undefined) {
      return [];
    }
    start = +start; // parse to int
    return input.slice(start);
  }
});
app.filter('stateFilter', [ function() {
  return function(items, selectedState) {
    if (!angular.isUndefined(items) && !angular.isUndefined(selectedState) && selectedState.length > 0) {
      var tempItems = [];
      angular.forEach(items, function(item) {
        selectedState.some(function(state) {
          if (angular.equals(item.state, state) || item.recentlyChanged != undefined) {
            tempItems.push(item);
            return true;
          }
        });
      });
      return tempItems;
    } else {
      return items;
    }
  };
} ])
