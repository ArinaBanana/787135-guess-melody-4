import React from "react";
import renderer from "react-test-renderer";
import GenreAnswer from "./genre-answer.jsx";

const answer = {
  src: `path`,
  genre: `rock`
};

const userAnswers = [true, false, true, false];

it(`Should render `, () => {
  const tree = renderer.create(<GenreAnswer index={0} answer={answer} userAnswers={userAnswers} updateAnswers={() => {}} />).toJSON();

  expect(tree).toMatchSnapshot();
});
