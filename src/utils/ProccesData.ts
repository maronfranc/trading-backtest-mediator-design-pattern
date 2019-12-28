export function proccessData(data: any) {
  return Object.entries(data).map((entries: any) => {
    // const [index, values] = entries;
    // return [index, values];
    return entries;
  });
}
