const InputHelper = {
  dangerousCharacters: ['<', '>', '\\', '/', '!', ";", '#', '\'', '\"'],

  hasDangerousInput(input) {
    const valueCart = input.split("");
    return this.dangerousCharacters.filter(function (n) {
      return valueCart.indexOf(n) !== -1;
    }).length !== 0;
  }

};

export default InputHelper;