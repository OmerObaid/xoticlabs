import checkMarkIcon from '../../assets/images/new-brand-icons/affirmative-check-mark.png'

const AttachmentGuidlines = () => {
    return <>
        <div className="attach">
            <ul className="attach-points">
                <li>
                    <img src={checkMarkIcon} alt="check mark" />
                    <p>Your logos</p>
                </li>
                <li>
                    <img src={checkMarkIcon} alt="check mark" />
                    <p>Product images</p>
                </li>
                <li>
                    <img src={checkMarkIcon} alt="check mark" />
                    <p>Fonts</p>
                </li>
                <li>
                    <img src={checkMarkIcon} alt="check mark" />
                    <p>Icons</p>
                </li>
            </ul>
            <ul className="attach-points">
                <li>
                    <img src={checkMarkIcon} alt="check mark" />
                    <p>Any existing designs/graphics</p>
                </li>
                <li>
                    <img src={checkMarkIcon} alt="check mark" />
                    <p>Marketing marterials/ads</p>
                </li>
                <li>
                    <img src={checkMarkIcon} alt="check mark" />
                    <p>Preferred stock photos</p>
                </li>
                <li>
                    <img src={checkMarkIcon} alt="check mark" />
                    <p>Templates/PSD/AI files</p>
                </li>
            </ul>
        </div>
    </>
}

export default AttachmentGuidlines
