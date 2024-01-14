const weightIndex = (weight, height) => {
  if (weight < height)
    throw new Error("weight must be first argument and height - second");
  if (weight === undefined || height === undefined)
    throw new Error("weight and height required");
  if (typeof weight === "string" || typeof height === "string")
    throw new Error("weight and height must be number");
  const result = (weight / height ** 2).toFixed(2);
  return Number(result);
};

export default weightIndex;
