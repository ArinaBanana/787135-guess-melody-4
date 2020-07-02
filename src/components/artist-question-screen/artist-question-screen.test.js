import React from 'react';
import renderer from 'react-test-renderer';
import ArtistQuestionScreen from './artist-question-screen';

const questions = [
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
  }
];

it(`Should ArtistQuestionScree render correctly`, () => {
  const tree = renderer.create(<ArtistQuestionScreen question={questions[0]} onAnswerDone={() =>{}} renderPlayer={() => {}} />, {
    createNodeMock: () => {
      return {};
    }
  }).toJSON();
  expect(tree).toMatchSnapshot();
});
