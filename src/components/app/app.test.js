import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";

import {App} from "./app.jsx";

const mockStore = configureStore([]);

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
    const store = mockStore({
      mistakes: 0,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            maxMistakes={3}
            questions={questions}
            onWelcomeButtonClick={() => {}}
            onUserAnswer={() => {}}
            step={-1}
          />
        </Provider>
    ).toJSON();

    jest
      .spyOn(window.HTMLMediaElement.prototype, `play`)
      .mockImplementation(() => {});

    expect(tree).toMatchSnapshot();
  });

  it(`Render Genre Question Screen`, () => {
    const store = mockStore({
      mistakes: 3,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            maxMistakes={3}
            questions={questions}
            onWelcomeButtonClick={() => {}}
            onUserAnswer={() => {}}
            step={0}
          />
        </Provider>, {
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
    const store = mockStore({
      mistakes: 3,
    });

    const tree = renderer.create(
        <Provider store={store}>
          <App
            maxMistakes={3}
            questions={questions}
            onWelcomeButtonClick={() => {}}
            onUserAnswer={() => {}}
            step={1}
          />
        </Provider>, {
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
