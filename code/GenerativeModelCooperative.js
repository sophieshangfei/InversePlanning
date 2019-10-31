// a -- 60
// b -- 70
// c -- 80
var action =  Categorical({vs: ['a', 'b', 'c'], ps: [1/3, 1/3, 1/3]})
var actionPrior = function() {
  return sample(action)
}

var transition = function (state, action, player) {


};

var simulate = function(state, action, player) {
  var nextState = transition(state, action, player);
  if (isTerminal(nextState)) {
    return nextState;
  } else {
    var agent_b_Action = agent_b(depth - 1);
    var nextAction = sample(act(nextState, agent_b_Action));
    return simulate(nextState, nextAction, agent_b_Action);
  }
};

var agent_a = dp.cache(function(depth) {
  return Infer({ model() {
    var agent_A_action = actionPrior();
    var agent_B_action = sample(agent_b(depth - 1));
    var eu = expectation(Infer({ model() {
      var outcome = simulate(state, action, player);
      return utility_agentA_WITH_B(outcome, agent_a, agent_b);
    }}));
    factor(eu);
    return agent_A_action;
  }});
});

// agent_b will utilize the same policy as agent_a
// thus, take the same action as agent_a does

var agent_b = dp.cache(function(depth) {
  return Infer({ model() {
    var myaction = actionPrior();
    if (depth === 0) {
      return myaction;
    } else {
      var A_action = sample(agent_a(depth, state, player));
      condition(myaction === A_action);
      return myaction;
    }
  }});
});

var utility_agentA_WITH_B = function(state, agent_a, agent_b){
  if ([agent_a, agent_b] == [80, 80]) {
    return 44+44;
  } else {
    if ([agent_a, agent_b] == [70, 80]) {
      return 72+8;
    } else {
      if ([agent_a, agent_b] == [60, 80]) {
      return 60+8;
    } else {
      if ([agent_a, agent_b] == [80, 70]) {
        return 8+72;
      } else {
        if ([agent_a, agent_b] == [70, 70]) {
          return 32+32;
        } else {
          if ([agent_a, agent_b] == [60, 70]){
            return 60+12;
          } else {
            if ([agent_a, agent_b] == [80, 60]) {
              return 8+60;
            } else {
              if ([agent_a, agent_b] == [70, 60]) {
                return 12+60;
              } else {
                if ([agent_a, agent_b] == [60, 60]) {
                  return 20+20;
                  }
                } 
              }
            }
          }
        }
      }
    }
  }
}






