import FsLightbox from "../../src/FsLightbox";
import { testProps, testUrls } from "../schemas/testVariables";
import React from 'react';
import { mount } from "enzyme";
import { FsLightboxMock } from "../__mocks__/components/fsLightboxMock";
import { StageSourceHoldersByValueTransformer } from "../../src/core/Transforms/StageSourceHoldersTransformers/StageSourceHoldersByValueTransformer";
import { StageSourceHoldersTransformer } from "../../src/core/Transforms/StageSourceHoldersTransformers/StageSourceHoldersTransformer";

describe('initialize', () => {
    const fsLightbox = new FsLightbox(testProps);
    fsLightbox.core.sizeController.controlAll = jest.fn();
    fsLightbox.core.eventsControllers.window.resize.attachListener = jest.fn();
    fsLightbox.core.eventsControllers.window.swiping.attachListeners = jest.fn();
    const testStageHolderTransformer = {
        withoutTimeout: jest.fn(),
    };
    fsLightbox.core.sourceHoldersTransformer.transformStageSourceHolders = function () {
        return testStageHolderTransformer;
    };
    fsLightbox.initialize();

    it('should init core that need to be initialized', () => {
        expect(fsLightbox.core.sizeController.controlAll).toBeCalled();
        expect(fsLightbox.core.eventsControllers.window.resize.attachListener).toBeCalled();
        expect(fsLightbox.core.eventsControllers.window.swiping.attachListeners).toBeCalled();
        expect(testStageHolderTransformer.withoutTimeout).toBeCalled();
    });
});


describe('FsLightbox props', () => {
    const fsLightbox = mount(<FsLightbox slide={ 1 } isOpen={ true } urls={ testUrls }/>);
    /**
     * @type {FsLightbox}
     */
    const fsLightboxInstance = fsLightbox.instance();

    it('should call changeSlide on changeSlideProp', () => {
        fsLightboxInstance.core.slideChanger.changeSlideTo = jest.fn();
        expect(fsLightboxInstance.state.slide).toEqual(1);
        fsLightbox.setProps({
            slide: 2
        }, () => {
            expect(fsLightboxInstance.core.slideChanger.changeSlideTo).toBeCalled();
        });
    });
});

describe('dependency injector', () => {
    const fsLightboxMock = new FsLightboxMock();
    const fsLightbox = fsLightboxMock.getFsLightbox();

    it('should return StageSourceHoldersTransformer object', () => {
        expect(fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer(fsLightbox))
            .toBeInstanceOf(StageSourceHoldersTransformer);
    });

    it('should return StageSourceHoldersByValueTransformer object', () => {
        expect(fsLightbox.injector.transforms.getStageSourceHoldersByValueTransformer(fsLightbox))
            .toBeInstanceOf(StageSourceHoldersByValueTransformer);
    });
});