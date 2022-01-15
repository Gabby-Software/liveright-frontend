const isPropValuesEqual = (subject: any, target: any, propNames: any) =>
  propNames.every((propName: any) => subject[propName] === target[propName])

export const getUniqueItemsByProperties = (
  items: any[],
  propNames: string | string[]
) => {
  const propNamesArray = Array.from(propNames)
  return items.filter(
    (item, index, array) =>
      index ===
      array.findIndex((foundItem) =>
        isPropValuesEqual(foundItem, item, propNamesArray)
      )
  )
}
