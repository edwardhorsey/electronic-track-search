const uniqueId = ((): ((prefix: string) => string) => {
  let counter = 0;

  return (prefix: string): string => {
    counter += 1;

    return `${prefix}${counter}`;
  };
})();

export default uniqueId;
