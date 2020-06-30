import React from "react";
import {configure, shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AudioPlayer from "./audio-player";

configure({adapter: new Adapter()});

const src = `path`;

describe(`Checks click on button`, () => {
  it(`Checks click on the button - pause`, () => {
    const onButtonPlayClick = jest.fn();
    const audioPlayer = shallow(<AudioPlayer onButtonPlayClick={onButtonPlayClick} isPlaying={false} src={src} />, {disableLifecycleMethods: true});
    const button = audioPlayer.find(`button`);

    expect(button.hasClass(`track__button track__button--play`)).toEqual(true);
  });

  it(`Checks click on the button - play`, () => {
    const onButtonPlayClick = jest.fn();
    const audioPlayer = shallow(<AudioPlayer onButtonPlayClick={onButtonPlayClick} isPlaying={true} src={src} />, {disableLifecycleMethods: true});
    const button = audioPlayer.find(`button`);

    expect(button.hasClass(`track__button track__button--pause`)).toEqual(true);
  });

  it(`Checks that a callback is called at the click of button`, () => {
    const onButtonPlayClick = jest.fn();
    const audioPlayer = shallow(<AudioPlayer onButtonPlayClick={onButtonPlayClick} isPlaying={true} src={src} />, {disableLifecycleMethods: true});
    const button = audioPlayer.find(`button`);

    button.simulate(`click`);

    expect(onButtonPlayClick).toHaveBeenCalled();
  });
});
