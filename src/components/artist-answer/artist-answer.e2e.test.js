import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistAnswer from "./artist-answer";

const answer = {
  picture: `path`,
  artist: `John Snow`
};

const index = 0;

configure({adapter: new Adapter()});

it(`User answer passed callback is consistent`, () => {
  const onChangeAnswer = jest.fn();
  const isChecked = true;

  const artistAnswer = shallow(<ArtistAnswer
    index={index}
    answer={answer}
    isChecked={isChecked}
    onChangeAnswer={onChangeAnswer} />);

  const input = artistAnswer.find(`input`);

  const inputChangePrevention = jest.fn();
  input.simulate(`change`, {preventDefault: inputChangePrevention});

  expect(onChangeAnswer).toBeCalledWith(answer, index);
});
