
export const isObjectEmpty = (obj) => {
  return Object.keys(obj).length === 0;
};

export const generateActivationCode=()=> {
  const min = 1000;
  const max = 9999;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
