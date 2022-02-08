
  export function isFullArray(array: any[]) {
    return array.every((element: {
      name: string;
    }) => element.name);
  }