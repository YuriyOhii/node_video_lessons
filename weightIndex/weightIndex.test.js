import weightIndex from "./weightIndex.js";

/*
1. Given weight in kg and height in metr.
2. Return (weight / (height * height)) round to 2.
3. If given invalid arguments throw error with correct message.


90, 1.9 => 24.93
1.9, 90 => error 'weight must be first argument and height - second'
 => error 'weight and height required'
'90', '1.9' => error 'weight and height must be number'*/

describe("test calcweight function", () => {
  test("valid data setting", () => {
    const result = weightIndex(90, 1.9);
    expect(result).toBe(24.93);
  });

  test("1.9, 90 => error 'weight must be first argument and height - second'", () => {
    expect(() => weightIndex(1.9, 90)).toThrow(
      "weight must be first argument and height - second"
    );
  });

  test(" => error 'weight and height required'", () => {
    expect(() => weightIndex()).toThrow("weight and height required");
  });

  test("'90', '1.9' => error 'weight and height must be number'", () => {
    expect(() => weightIndex("90", "1.9")).toThrow(
      "weight and height must be number"
    );
  });
});
