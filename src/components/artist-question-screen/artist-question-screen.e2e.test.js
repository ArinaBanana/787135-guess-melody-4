import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ArtistQuestionScreen from "./artist-question-screen";

const mock = {
  question: {
    type: `artist`,
    song: {
      artist: ``,
      src: ``
    },
    answers: [
      {
        artist: `one`,
        picture: `pic-one`,
      },
      {
        artist: `two`,
        picture: `pic-two`,
      },
      {
        artist: `three`,
        picture: `pic-three`,
      },
    ],
  }
};

configure({adapter: new Adapter()});

it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
  const {question} = mock;
  const onAnswerDone = jest.fn();
  const userAnswer = {
    artist: `one`,
    picture: `pic-one`
  };

  const screen = shallow(<ArtistQuestionScreen onAnswerDone={onAnswerDone} question={question} />);

  const answerInputs = screen.find(`input`);
  const answerOne = answerInputs.at(0);

  answerOne.simulate(`change`, {preventDefault() {}});

  expect(onAnswerDone).toHaveBeenCalledTimes(1);

  expect(onAnswerDone.mock.calls[0][0]).toMatchObject(question);
  expect(onAnswerDone.mock.calls[0][1]).toMatchObject(userAnswer);
});