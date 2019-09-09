const compareObjectsByAttribute = (dataType, a, b, attr, gt = true) => {
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
  return objectList
    .concat()
    .sort((a, b) =>
      compareObjectsByAttribute(dataType, a, b, attribute, ascending)
    );
};
