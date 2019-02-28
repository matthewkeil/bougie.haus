
const WIKIPEDIA_URL = /^https:\/\/(.*).wikipedia.org\/wiki\/(.*)?$/


  const isValidWikipediaUrl = value => {

    console.log(WIKIPEDIA_URL.test(value));
  }
  
  isValidWikipediaUrl('https://en.wikipedia.org/wiki/Aristotle/');
  