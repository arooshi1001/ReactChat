import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore"; // Ensure these imports are present
import { auth, db } from "../../lib/firebase"; // Ensure db is imported
import "./detail.css";
import { useUserStore } from "../../lib/userStore";
import { useChatStore } from "../../lib/chatStore";

const Detail = () => {
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock } = useChatStore();
  const { currentUser } = useUserStore();

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });
      changeBlock();
    } catch (err) {
      console.error("Failed to update block status:", err);
    }
  };

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="User Avatar" />
        <h2>{user?.username}</h2>
        <p>I’m currently working hard 
          to make this website even better.
           Thanks for your patience and 
           understanding—stay tuned for 
           exciting updates! Peace out!</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="Arrow Up" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <img src="./arrowUp.png" alt="Arrow Up" />
          </div>
        </div>

        {/* Shared Photos - Use a loop if the content is repetitive */}
        {[1, 2].map((_, index) => (
          <div className="option" key={index}>
            <div className="title">
              <span>Shared Photos</span>
              <img src="./arrowUp.png" alt="Arrow Up" />
            </div>
            <div className="photos">
              <div className="photoItem">
                <div className="photoDetail">
                  <img
                    src="https://images.pexels.com/photos/1239162/pexels-photo-1239162.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="Shared Photo"
                  />
                  <span>photo_2024_2.png</span>
                </div>
                <img src="./download.png" alt="Download Icon" className="icon" />
              </div>
            </div>
          </div>
        ))}

        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="Arrow Up" />
          </div>
        </div>
        <button className="block-user" onClick={handleBlock}>
          {isCurrentUserBlocked ? "You are Blocked!" : isReceiverBlocked ? "User blocked" : "Block user"}
        </button>

        <button className="logout" onClick={() => auth.signOut()}>Log Out</button>
      </div>
    </div>
  );
};

export default Detail;
