export const getFirstLetters = user => {
  console.log('user-----------------------', user);

  const firstLetters = [];
  const words = user.split(' ');

  words.map(word => firstLetters.push(word[0]));

  return firstLetters.map(firstLetter => firstLetter);
};
