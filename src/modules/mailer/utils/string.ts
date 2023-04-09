function capitalizeFirstLetter(word: string) {
  let output = '';

  for (let i = 0; i < word.length; i += 1) {
    if (i === 0) {
      output += word[i].toUpperCase();
    } else {
      output += word[i];
    }
  }

  return output;
}

export { capitalizeFirstLetter };
