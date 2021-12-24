export const uniqueId = ((): ((prefix: string) => string) => {
  let counter = 0;

  return (prefix: string): string => {
    counter += 1;

    return `${prefix}${counter}`;
  };
})();

export const removeEmptyObjectsFromArray = <T>(
  array: T[],
): T[] => array.filter((result) => (
    Object.keys(result).length > 0
  ));
