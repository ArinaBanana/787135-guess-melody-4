import React from "react";
import renderer from "react-test-renderer";
import ArtistAnswer from "./artist-answer.jsx";

const answer = {
  picture: `path`,
  artist: `John Snow`
};

it(`Should render Artist Answer`, () => {
  const tree = renderer.create(<ArtistAnswer index={1} isChecked={true} answer={answer} onChangeAnswer={() => {}} />).toJSON();

  expect(tree).toMatchSnapshot();
});
