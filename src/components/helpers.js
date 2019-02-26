export function listify(array) {
    return array
      .map((name, i) => {
        if (array.length - i === 1) {
          return name;
        }

        if (array.length - i === 2) {
          return `${name} and `;
        }

        return `${name}, `;
      })
      .join("");
  }