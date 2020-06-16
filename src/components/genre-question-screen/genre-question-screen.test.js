import React from 'react';
import renderer from 'react-test-renderer';
import GenreQuestionScreen from "./genre-question-screen";

it(`Should GenreQuestScreen render correctly`, () => {
  const tree = renderer.create(<GenreQuestionScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});
