var actionPrior = Categorical({vs: [60, 70, 80], ps: [1/3, 1/3, 1/3]})
var PriceSetting = function (state, action) {
	return (action == 60 ? categorical ({vs: ["unresponsive", "self-serving", "cooperative"], ps: [0.4, 0.4, 0.2]})) :
	action == 70 ? categorical ({vs: ["unresponsive", "self-serving", "cooperative"], ps: [0.2, 0.4, 0.4]}):
	action == 80 ? categorical ({vs: ["unresponsive", "self-serving", "cooperative"], ps: [0.4, 0.2, 0.4]}):
	'nothing');

}

var chooseAction = function(goalSatisfied, transition, state) {
	return Infer({method: "enumerate"}, function () {
		var action = sample(actionPrior)
		condition(goalSatisfied(transition(state, action)))
		return action;

	
	})
}

var goalPosterior = Infer({method: "enumerate"}, function () {
	var goal = categorical({vs: ["unresponsive", "self-serving", "cooperative"], ps: [1/3, 1/3, 1/3]})
	var goalSatisfied = function(outcome) {return outcome == goal};
	var actionDist = chooseAction(goalSatisfied, PriceSetting, "state")
	factor (actionDist.score("self-serving"));
	return goal;
})
goalPosterior