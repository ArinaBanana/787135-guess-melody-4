import React from "react";
import renderer from "react-test-renderer";
import GenreAnswer from "./genre-answer.jsx";

const answer = {
  src: `path`,
  genre: `rock`
};

const userAnswers = [true, false, true, false];

it(`Should render `, () => {
  const tree = renderer.create(<GenreAnswer
    index={0}
    userAnswer={userAnswers[1]}
    audioUrl={answer.src}
    onChangeAnswer={() => {}} />).toJSON();

  expect(tree).toMatchSnapshot();
});
