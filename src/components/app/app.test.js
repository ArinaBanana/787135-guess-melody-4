import React from 'react';
import renderer from 'react-test-renderer';
import App from "./app.jsx";

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `path`,
      genre: `rock`,
    }, {
      src: `path`,
      genre: `blues`,
    }, {
      src: `path`,
      genre: `jazz`,
    }, {
      src: `path`,
      genre: `rock`,
    }],
  }
];

it(`Render App`, () => {
  const tree = renderer.create(<App errorsCount={3} questions={questions} />).toJSON();
  expect(tree).toMatchSnapshot();
});
