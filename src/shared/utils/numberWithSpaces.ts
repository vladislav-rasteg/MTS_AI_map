export const numberWithSpaces = (x: string | number) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  }