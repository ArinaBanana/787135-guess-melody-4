import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreAnswer from "./genre-answer";

const answer = {
  src: `path`,
  genre: `rock`
};

const userAnswers = [false, true, true, false];

configure({adapter: new Adapter()});

it(`User answer passed callback is consistent with "userAnswer" prop`, () => {
  const onChangeAnswer = jest.fn((...args) => [...args]);

  const genreAnswer = shallow(<GenreAnswer
    index={0}
    onChangeAnswer={onChangeAnswer}
    audioUrl={answer.src}
    userAnswer={userAnswers[0]}
    renderPlayer={() => {}} />);

  const input = genreAnswer.find(`input`);

  input.simulate(`change`, {target: {checked: true}});

  expect(onChangeAnswer).toBeCalledWith(true, 0);
});
