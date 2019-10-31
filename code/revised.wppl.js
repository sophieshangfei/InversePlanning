// a - 80
// b - 70
// c - 60
var actions = Categorical({vs: ['a', 'b', 'c'], ps: [1/3, 1/3, 1/3]})
// Agent B has a tendency to be cooperative. In this case, people will compare three types of agent A knowing that

var agent_b_action_prior = Categorical({vs: ['a', 'b', 'c'], ps: [0.25, 0.25, 0.5]})
var agent_a_type = Categorical({vs: ['s', 'co'], ps: [1/2, 1/2]})

// agent A infer about agent B based on its past record
var infer_b = {method: 'forward', samples: 1000}
var model = function() {
  var action_b = sample(agent_b_action_prior)
  return action_b
}
// agent a's inference on the chances of agent b's behavior
var freq_price = Infer(infer_b, model)



/////////////////////////////////////////////////////////////////////////////////////
////////////////////// Construction of self-serving Agent A /////////////////////////

var argMax = function(f, ar){
  return maxWith(f, ar)[0]
};

var transition = function(state, action) {
  var nextStates = ['aa', 'ab', 'ac', 'ba', 'bb', 'bc', 'ca', 'cb', 'cc'];
  var nextProbs = (action === 'a') ? [0.6, 0.3, 0.1, 0, 0, 0, 0, 0, 0] : 
                  (action === 'b') ? [0, 0, 0, 0.5, 0.3, 0.2, 0, 0, 0]:
                  (action === 'c') ? [ 0, 0, 0, 0, 0, 0, 0.4, 0.3, 0.3]:
                  'nothing';
  return categorical(nextProbs, nextStates);
};


var utility = function(state) {
  var table = {
    aa: 44,
    ab: 8,
    ac: 8,
    ba: 72,
    bb: 32,
    bc: 12,
    ca: 60,
    cb: 60,
    cc: 20
  }
  //print (table);
  //print (table[state]);
  return table[state];
};



var maxEUAgent = function(state) {
  var expectedUtility = function(action) {
    return expectation(Infer({ 
      model() {
        return utility(transition(state, action));
      }
    }));
  };
  return argMax(expectedUtility, actions);
};

var self = maxEUAgent('initialState');





/////////////////////////////////////////////////////////////////////////////////////
////////////////////// Construction of cooperative Agent A /////////////////////////
///fold: argMax
var argMax = function(f, ar){
  return maxWith(f, ar)[0]
};
///

/// var actions = ['italian', 'french'];
var actions = ['a', 'b', 'c'];

var transition = function(state, action) {
  var nextStates = ['aa', 'ab', 'ac', 'ba', 'bb', 'bc', 'ca', 'cb', 'cc'];
  var nextProbs = (action === 'a') ? [0.6, 0.3, 0.1, 0, 0, 0, 0, 0, 0] : 
                  (action === 'b') ? [0, 0, 0, 0.5, 0.3, 0.2, 0, 0, 0]:
                  (action === 'c') ? [ 0, 0, 0, 0, 0, 0, 0.4, 0.3, 0.3]:
                  'nothing';
  return categorical(nextProbs, nextStates);
};


var utility = function(state) {
  var table = {
    aa: 44+44,
    ab: 8+72,
    ac: 8+60,
    ba: 72+8,
    bb: 32+32,
    bc: 12+60,
    ca: 60+8,
    cb: 60+12,
    cc: 20+20
  }
  print (table);
  print (table[state]);
  return table[state];
};



var maxEUAgent = function(state) {
  var expectedUtility = function(action) {
    return expectation(Infer({ 
      model() {
        return utility(transition(state, action));
      }
    }));
  };
  return argMax(expectedUtility, actions);
};

var coop = maxEUAgent('initialState');

////////////////////////////////////////////////////////////////////

var type_of_A = function(state, action) {
  return (action == 's' ? 'self-serving' :
          action == 'co' ? 'cooperative':
          'no att');
}


/// agent a can either be unresponsive, self-serving or cooperative
 var setPrice = function(goalSatisfied, transition, state) {
  return Infer({method: 'enumerate'}, function()) {
    var agent_A = sample(agent_a_type)
    if (agent_A=='s') { 
      var action = self;
    };
    if (agent_A=='co') { 
      var action = coop;
    };

    condition(goalSatisfied(transition(state, action)))
    return action;
  }
 }


var attPosterior = Infer({method: 'enumerate'}, function() {
  var att = categorical({vs: ['self-serving', 'cooperative'], ps: [.5, .5]})
  var goalSatisfied = function(outcome) {return outcome == goal};
  var actionDist = setPrice(goalSatisfied, type_of_A, 'state')
  factor(actionDist.score('b'));
  return goal;
})
/////////////////////////////////////////////////////////////////////////////////////
// var actionPrior = Categorical({vs: ['a', 'b'], ps: [.5, .5]})
// var haveCookie = function(obj) {return obj == 'cookie'};

// /// vending machine is the transition function here
// /// agent a's transition function is type of agent a
// var vendingMachine = function(state, action) {
//   return (action == 'a' ? categorical({vs: ['bagel', 'cookie'], ps: [.9, .1]}) :
//           action == 'b' ? categorical({vs: ['bagel', 'cookie'], ps: [.1, .9]}) :
//           'nothing');
// }
// ///
// var chooseAction = function(goalSatisfied, transition, state) {
//   return Infer({method: 'enumerate'}, function() {
//     var action = sample(actionPrior)
//     condition(goalSatisfied(transition(state, action)))
//     return action;
//   })
// }

// var goalPosterior = Infer({method: 'enumerate'}, function() {
//   var goal = categorical({vs: ['bagel', 'cookie'], ps: [.5, .5]})
//   var goalSatisfied = function(outcome) {return outcome == goal};
//   var actionDist = chooseAction(goalSatisfied, vendingMachine, 'state')
//   factor(actionDist.score('b'));
//   return goal;
// })

// viz.auto(goalPosterior);
/////////////////////////////////////////////////////////////////////////////////////

// /// utility function for cooperative agent
// var utility = function(action_a, action_b) {
//     if (agent_A=='a' && agent_B=="a") {
//       var u = 44 + 44
//       print (u);
//     } else if (agent_A=='a' && agent_B=="b") {
//       var u = 8 + 72
//       print (u);
//     } else  if (agent_A=='a' && agent_B=="c") {
//       var u = 8 + 60
//       print (u);
//     } else if (agent_A=='b' && agent_B=="a") {
//       var u = 72 + 8
//       print (u);
//     } else if (agent_A=='b' && agent_B=="b") {
//       var u = 32 + 32
//       print (u);
//     } else if (agent_A=='b' && agent_B=="c") {
//       var u = 12 + 60
//       print (u);
//     } else if (agent_A=='c' && agent_B=="a") {
//       var u = 60 + 8
//       print (u);
//     } else if (agent_A=='c' && agent_B=="b") {
//       var u = 60 + 12
//       print (u);
//     } else if (agent_A=='c' && agent_B=="c") {
//       var u = 20 + 20
//       print (u);
//     };

// }


