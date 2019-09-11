import {
  compareObjectsByAttribute,
  sortObjectsByAttribute
} from "../../lib/sort";

it("compareObjectsByAttribute should return 1 when attr on a is greater than b by default", () => {
  const compareA = { id: 2 };
  const compareB = { id: 1 };
  const value = compareObjectsByAttribute("int", compareA, compareB, "id");
  expect(value).toEqual(1);
});

it("compareObjectsByAttribute should return -1 when attr on a is less than b by default", () => {
  const compareA = { id: 1 };
  const compareB = { id: 2 };
  const value = compareObjectsByAttribute("int", compareA, compareB, "id");
  expect(value).toEqual(-1);
});

it("compareObjectsByAttribute should return 1 when attr on a is less than b when gt=false", () => {
  const compareA = { id: 1 };
  const compareB = { id: 2 };
  const value = compareObjectsByAttribute("int", compareA, compareB, "id", false);
  expect(value).toEqual(1);
});

it("compareObjectsByAttribute should return -1 when attr on a is greater than b when gt=false", () => {
  const compareA = { id: 2 };
  const compareB = { id: 1 };
  const value = compareObjectsByAttribute("int", compareA, compareB, "id", false);
  expect(value).toEqual(-1);
});

it("sortObjectsByAttribute should return objects in ascending order by default", () => {
  const objList = [
    {
      id: 4
    },
    {
      id: 3
    },
    {
      id: 5
    },
    {
      id: 1
    },
    {
      id: 2
    }
  ];
  const expected = [
    {
      id: 1
    },
    {
      id: 2
    },
    {
      id: 3
    },
    {
      id: 4
    },
    {
      id: 5
    }
  ];
  const sorted = sortObjectsByAttribute(objList, "id");
  expect(sorted).toEqual(expected);
});

it("sortObjectsByAttribute should return objects in descending order when requested", () => {
  const objList = [
    {
      id: 4
    },
    {
      id: 3
    },
    {
      id: 5
    },
    {
      id: 1
    },
    {
      id: 2
    }
  ];
  const expected = [
    {
      id: 5
    },
    {
      id: 4
    },
    {
      id: 3
    },
    {
      id: 2
    },
    {
      id: 1
    }
  ];
  const sorted = sortObjectsByAttribute(objList, "id", false);
  expect(sorted).toEqual(expected);
});
