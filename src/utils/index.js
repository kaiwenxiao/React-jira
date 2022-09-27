// 0在业务上是一个真值，而不是js的假值(一个！为求反，两个为求反后的boolean) !undefined === true -- !!0 === false
export const isFalsy = (value) => (value === 0 ? false : !value);

// 在一个函数中，改变传入的对象本身是不好的
export const cleanObject = (object) => {
  // Object.assign({}, object)
  const result = { ...object };
  Object.keys(result).forEach((key) => {
    const value = result[key];
    if (isFalsy(value)) {
      delete result[key];
    }
  });
  return result;
};
