import crossIcon from "../assets/images/new-brand-icons/cross-sign.png";
import colorOverlayHeadIcon from "../assets/images/color-overlay-head.png";

import { ColorPicker, useColor } from "react-color-palette";
import "react-color-palette/lib/css/styles.css";
import { useEffect, useRef, useState } from "react";


const ColorBox = ({ closeCallBack }) => {

    const [color, setColor] = useColor("hex", "#121212");
    const ref = useRef(null);
    const scrollRef = useRef(null);

    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const executeScroll = () => scrollRef.current.scrollIntoView({ behavior: 'smooth' })

    const handleResize = () => {
        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);
    }

    useEffect(() => {

        setWidth(ref.current.offsetWidth);
        setHeight(ref.current.offsetHeight);

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, []);

    useEffect(() => {
        executeScroll();
    }, [])

    return <>
        <div className="colorBox active">
            <div className="colorBox-overlay"></div>
            <div className="colorBox-main" ref={scrollRef}>
                <img onClick={closeCallBack} src={crossIcon} alt="cross sign" />
                <div className="colorBox_head">
                    <img src={colorOverlayHeadIcon} alt="cover overlay" />
                    <h2>Select a custom Hex</h2>
                </div>
                <div className="colorBox-box" ref={ref}>
                    <ColorPicker width={width} height={height - 165} color={color} onChange={setColor} hideRGB alpha hideHSV />
                </div>
                <div className="colorBox-btns">
                    <button onClick={closeCallBack} type="button" >Cancel</button>
                    <button onClick={() => closeCallBack({ color: color })} type="button" >Select</button>
                </div>
            </div>
        </div>
    </>
}

export default ColorBox
