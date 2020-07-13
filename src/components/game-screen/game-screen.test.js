import React from "react";
import renderer from "react-test-renderer";
import {GameScreen} from "./game-screen.jsx";
import {GameType} from "../../const.js";

const children = <div className="children-component" />;

describe(`Should render Game Screen`, () => {
  it(`With type artist`, () => {
    const tree = renderer.create(
        <GameScreen type={GameType.ARTIST} mistakes={3}>
          {children}
        </GameScreen>);
    expect(tree).toMatchSnapshot();
  });

  it(`With type genre`, () => {
    const tree = renderer.create(
        <GameScreen type={GameType.GENRE} mistakes={3}>
          {children}
        </GameScreen>);
    expect(tree).toMatchSnapshot();
  });
});
