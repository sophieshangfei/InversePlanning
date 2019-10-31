var utility_agentA_WITH_B = function(agent_a, agent_b){
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
var utility_agentA = function(agent_a, agent_b){
  if ([agent_a, agent_b] == [80, 80]) {
    return 44;
  } else {
    if ([agent_a, agent_b] == [70, 80]) {
      return 72;
    } else {
      if ([agent_a, agent_b] == [60, 80]) {
      return 60;
    } else {
      if ([agent_a, agent_b] == [80, 70]) {
        return 8;
      } else {
        if ([agent_a, agent_b] == [70, 70]) {
          return 32;
        } else {
          if ([agent_a, agent_b] == [60, 70]){
            return 60;
          } else {
            if ([agent_a, agent_b] == [80, 60]) {
              return 8;
            } else {
              if ([agent_a, agent_b] == [70, 60]) {
                return 12;
              } else {
                if ([agent_a, agent_b] == [60, 60]) {
                  return 20;
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

var utility_agentB = function(agent_a, agent_b){
  if ([agent_a, agent_b] == [80, 80]) {
    return 44;
  } else {
    if ([agent_a, agent_b] == [70, 80]) {
      return 8;
    } else {
      if ([agent_a, agent_b] == [60, 80]) {
      return 8;
    } else {
      if ([agent_a, agent_b] == [80, 70]) {
        return 72;
      } else {
        if ([agent_a, agent_b] == [70, 70]) {
          return 32;
        } else {
          if ([agent_a, agent_b] == [60, 70]){
            return 12;
          } else {
            if ([agent_a, agent_b] == [80, 60]) {
              return 60;
            } else {
              if ([agent_a, agent_b] == [70, 60]) {
                return 60;
              } else {
                if ([agent_a, agent_b] == [60, 60]) {
                  return 20;
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
