import React, { Component } from 'react';
import '../src/scss/FsLightbox.scss';
import "./css/demo.css";
import FsLightbox from '../src/FsLightbox.jsx';
import { TEST_IMAGE_URL, TEST_VIDEO_URL } from "./demoData";

class DemoComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            toggler: true,
            toggler2: false,
            updated: true,
            slide: 1,
            source: '',
            sourceIndex: 0
        };

        setTimeout(() => {
            console.log(1);

            // this.setState({
            //     sourceIndex: 1
            // });
        }, 5000);

        this.toggleLightbox = this.toggleLightbox.bind(this);
        this.toggleLightboxSecond = this.toggleLightboxSecond.bind(this);
    }

    toggleLightbox() {
        this.setState({
            toggler: !this.state.toggler
        });
    }
    toggleLightboxSecond() {
        this.setState({
            toggler2: !this.state.toggler2
        });
    }

    render() {
        return (
            <>
                <button onClick={ this.toggleLightbox }>Toggle Lightbox</button>
                <button onClick={ this.toggleLightboxSecond }>Toggle Lightbox</button>
                <div className="images">
                    <img className="image" src="../demo/images/1.jpeg" alt=""/>
                    <img className="image" src="../demo/images/2.jpg" alt=""/>
                    <img className="image" src="../demo/images/3.jpeg" alt=""/>
                </div>
                <FsLightbox
                    toggler={ this.state.toggler }
                    sources={ [null, null, 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'] }
                    customSources={ [
                        <div style={ { width: '400px', height: '400px', background: 'black' } }>
                        </div>,
                        <div style={ { width: '400px', height: '400px', background: 'red' } }>
                        </div>
                    ] }
                />
                <FsLightbox toggler={ this.state.toggler2 } sources={ ["../demo/images/5.jpg"] }/>
            </>
        );
    }
}

export default DemoComponent;
