import faker from "faker";

export const uniqueString = (str: string) => {
  return `${str} ${faker.datatype.uuid()}`
}
