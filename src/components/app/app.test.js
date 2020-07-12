import React from 'react';
import renderer from 'react-test-renderer';
import {App} from "./app.jsx";

const questions = [
  {
    type: `genre`,
    genre: `rock`,
    answers: [{
      src: `path`,
      genre: `rock`,
    }, {
      src: `path`,
      genre: `blues`,
    }, {
      src: `path`,
      genre: `jazz`,
    }, {
      src: `path`,
      genre: `rock`,
    }],
  },
  {
    type: `artist`,
    song: {
      artist: `Jim Beam`,
      src: `path`,
    },
    answers: [{
      picture: `path`,
      artist: `John Snow`,
    }, {
      picture: `path`,
      artist: `Jack Daniels`,
    }, {
      picture: `path`,
      artist: `Jim Beam`,
    }],
  },
];

describe(`Render App`, () => {
  it(`Render Welcome Screen`, () => {
    const tree = renderer.create(<App
      errorsCount={3}
      questions={questions}
      onWelcomeButtonClick={() => {}}
      onUserAnswer={() => {}}
      step={-1}
    />).toJSON();

    jest
      .spyOn(window.HTMLMediaElement.prototype, `play`)
      .mockImplementation(() => {});

    expect(tree).toMatchSnapshot();
  });

  it(`Render Genre Question Screen`, () => {
    const tree = renderer.create(<App
      errorsCount={3}
      questions={questions}
      onWelcomeButtonClick={() => {}}
      onUserAnswer={() => {}}
      step={0}
    />, {
      createNodeMock: () => {
        return document.createElement(`audio`);
      }
    }).toJSON();

    jest
      .spyOn(window.HTMLMediaElement.prototype, `play`)
      .mockImplementation(() => {});

    expect(tree).toMatchSnapshot();
  });

  it(`Render Artist Question Screen`, () => {
    const tree = renderer.create(<App
      errorsCount={3}
      questions={questions}
      onWelcomeButtonClick={() => {}}
      onUserAnswer={() => {}}
      step={1}
    />, {
      createNodeMock: () => {
        return document.createElement(`audio`);
      }
    }).toJSON();

    jest
      .spyOn(window.HTMLMediaElement.prototype, `play`)
      .mockImplementation(() => {});

    expect(tree).toMatchSnapshot();
  });
});
