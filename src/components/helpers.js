import React, { Fragment } from "react";
import TextField from "@material-ui/core/TextField";

export function canonical(string) {
  let first = string.slice(0,1).toUpperCase();
  let rest = string.slice(1);

  rest.toLowerCase().replace(/\s/g, "_");
  
  return first + rest
}

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

export function renderTextField({ meta: {touched, error, warning}, fullWidth, className, input, ...custom }) {
  return (
    <Fragment>
      <TextField
        fullWidth={fullWidth}
        className={className}
        label={input.name}
        type="text"
        {...input}
        {...custom}
      />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </Fragment>
  );
}

const WIKIPEDIA_URL = /^https?:\/\/(.*).wikipedia.org\/wiki\/(.*)?$/;

const testWikipediaUrl = value =>
  WIKIPEDIA_URL.test(value) ? undefined : "enter a valid wikipedia url";

const required = value => !!value && value !== "" ? undefined : "required";


export const validate = {
  testWikipediaUrl,
  required
};
