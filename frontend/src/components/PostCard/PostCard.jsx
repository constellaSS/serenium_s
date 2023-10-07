import './postCard.css'
import CardHeaderQuestion from "./CardHeaderQuestion.jsx";
import CardHeaderChallenge from "./CardHeaderChallenge.jsx";

function PostCard({ title,content,type }){
    return(<div className="postCard">
        {type ? (
            <CardHeaderQuestion/>
        ) : (
            <CardHeaderChallenge/>
        )}
        <h2 className="postCardTitle">{title}</h2>
        <p className="postCardContent">{content}</p>
        <div className="postCardButtonOutsideContainer">
            <div className="postCardButtonInerContainer">
                <button id="postCardLike" className="postCardActionButton" type="button"/>
                <button id="postCardSave" className="postCardActionButton" type="button"/>
                <button id="postCardShare" className="postCardActionButton" type="button"/>
                <button id="postCardBan" className="postCardActionButton" type="button"/>
            </div>
            <button className="cardPostAddButton" type="button"/>
        </div>
    </div>)
}
export default PostCard;