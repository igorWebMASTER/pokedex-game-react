
  export function isFullArray(array: any[]) {
    return array.every((element: string | any[]) => element.length !== 0);
  }