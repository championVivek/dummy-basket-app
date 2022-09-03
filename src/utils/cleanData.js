exports.cleanData = (data) => {
  const arrayUniqueByKey = [
    ...new Map(data.map((item) => [item["key"], item])).values(),
  ].filter((value) => Object.keys(value).length !== 0);
  return arrayUniqueByKey;
};
