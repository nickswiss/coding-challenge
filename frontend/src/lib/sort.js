export const compareObjectsByAttribute = (dataType, a, b, attr, gt = true) => {
  /*
  Comparator used for sorting strings and numbers
  Arguments:
    dataType: type of data being compared
    a: compare value a
    b: compare value b
    attr: which attribute on the object will we use
    gt: sort direction
   */
  const number = ["int", "decimal", "number"];
  const string = ["string"];
  var compareA = a[attr];
  var compareB = b[attr];
  if (number.includes(dataType)) {
    compareA = Number(compareA);
    compareB = Number(compareB);
  } else if (string.includes(dataType)) {
    compareA = compareA.toLowerCase();
    compareB = compareB.toLowerCase();
  }
  if (gt) {
    return compareA > compareB ? 1 : -1;
  } else {
    return compareA < compareB ? 1 : -1;
  }
};

export const sortObjectsByAttribute = (
  objectList,
  attribute,
  ascending = true,
  dataType = "number"
) => {
  /*
  Sorts a list of objects by a given attribute
  Arguments:
    objectList: List of objects
    attribute: attribute used to sort
    ascending: whether to sort ascending
    dataType: data type of the attribute being used to sort
  Returns:
    sorted_list: list sorted by attribute
   */
  return objectList
    .concat()
    .sort((a, b) =>
      compareObjectsByAttribute(dataType, a, b, attribute, ascending)
    );
};
