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

describe(`Test ArtistQuestionScreen component`, () => {
  const {question} = mock;
  const {answers} = question;
  const answer = answers[0];
  const onAnswerDone = jest.fn();

  it(`Click on user answer should pass to the callback data-object from which this answer was created`, () => {
    const artistQuestion = shallow(<ArtistQuestionScreen question={question} onAnswerDone={onAnswerDone}/>);
    const instance = artistQuestion.instance();

    expect(instance.state.currentIndexAnswer).toBe(-1);
    instance._updateAnswer(answer, 0);
    expect(instance.state.currentIndexAnswer).toBe(0);
  });

  describe(`Test isСhecked method`, () => {
    it(`is checked = true`, () => {
      const artistQuestion = shallow(<ArtistQuestionScreen question={question} onAnswerDone={onAnswerDone}/>);
      const instance = artistQuestion.instance();

      expect(instance.state.currentIndexAnswer).toBe(-1);
      instance._updateAnswer(answer, 0);
      expect(instance.state.currentIndexAnswer).toBe(0);

      expect(instance._isChecked(0)).toEqual(true);
    });

    it(`is checked = false`, () => {
      const artistQuestion = shallow(<ArtistQuestionScreen question={question} onAnswerDone={onAnswerDone}/>);
      const instance = artistQuestion.instance();

      expect(instance.state.currentIndexAnswer).toBe(-1);
      instance._updateAnswer(answer, 0);
      expect(instance.state.currentIndexAnswer).toBe(0);

      expect(instance._isChecked(1)).toEqual(false);
    });
  });
});
