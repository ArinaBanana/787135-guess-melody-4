import React from "react";
import renderer from "react-test-renderer";
import GenreAnswer from "./genre-answer.jsx";

const answer = {
  src: `path`,
  genre: `rock`
};

it(`Should render `, () => {
  const tree = renderer.create(<GenreAnswer index={0} answer={answer} />).toJSON();

  expect(tree).toMatchSnapshot();
});
