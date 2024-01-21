export function getConditionByKey(key) {
  const conditionMapper = {
    new: "New",
    like_new: "Like New",
    used_good: "Good",
    used_fair: "Fair",
    used_poor: "Poor",
  };

  return conditionMapper[key];
}
