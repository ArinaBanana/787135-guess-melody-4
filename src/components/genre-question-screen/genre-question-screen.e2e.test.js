import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import GenreQuestionScreen from "./genre-question-screen";

const mock = {
  question: {
    type: `genre`,
    genre: `rock`,
    answers: [
      {
        src: `path`,
        genre: `rock`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `jazz`,
      },
      {
        src: `path`,
        genre: `blues`,
      },
    ],
  },
};

configure({adapter: new Adapter()});

it(`When user answer genre question form not sent`, () => {
  const {question} = mock;
  const onAnswerDone = jest.fn();

  const genreQuestion = shallow(<GenreQuestionScreen question={question} onAnswerDone={onAnswerDone} />);

  const form = genreQuestion.find(`form`);
  const formSendPrevention = jest.fn();
  form.simulate(`submit`, {
    preventDefault: formSendPrevention
  });

  expect(onAnswerDone).toHaveBeenCalledTimes(1);
  expect(formSendPrevention).toHaveBeenCalledTimes(1);
});

it(`User answer passed callback is consistent with "userAnswer" prop`, () => {
  const {question} = mock;
  const onAnswerDone = jest.fn();
  const genreQuestion = shallow(<GenreQuestionScreen question={question} onAnswerDone={onAnswerDone} />);

  const instance = genreQuestion.instance();
  expect(instance.state.answers).toEqual([false, false, false, false]);
  instance._updateAnswers(true, 0);
  expect(instance.state.answers).toEqual([true, false, false, false]);
});
