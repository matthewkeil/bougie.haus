exports.canonical = string => {
    let first = string.slice(0, 1).toUpperCase();
    let rest = string.slice(1);
  
    rest.toLowerCase().replace(/\s/g, "_");
  
    return first + rest;
  }
  