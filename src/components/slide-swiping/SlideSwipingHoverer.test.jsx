import React from 'react';
import { shallow } from "enzyme";
import SlideSwipingHoverer from "./SlideSwipingHoverer";
import { testComponentStateForStateChainAndFsLightbox } from "../../../tests/__tests-helpers__/testComponentStateForStateChainAndFsLightbox";
import { ABSOLUTED_CLASS_NAME, FULL_DIMENSION_CLASS_NAME, PREFIX } from "../../constants/classes-names";

const fsLightbox = { componentsServices: { isSlideSwipingHovererShown: {} } };
const slideSwipingHoverer = shallow(<SlideSwipingHoverer fsLightbox={ fsLightbox }/>);

testComponentStateForStateChainAndFsLightbox('isSlideSwipingHovererShown', fsLightbox);

test('isSlideSwipingHovererShown DOM', () => {
    fsLightbox.componentsServices.isSlideSwipingHovererShown.set(false);
    expect(slideSwipingHoverer.getElement()).toBeNull();
    fsLightbox.componentsServices.isSlideSwipingHovererShown.set(true);
    expect(slideSwipingHoverer.getElement()).toEqual(
        <div className={ `${ PREFIX }slide-swiping-hoverer ${ FULL_DIMENSION_CLASS_NAME } ${ ABSOLUTED_CLASS_NAME }` }/>
    );
});
