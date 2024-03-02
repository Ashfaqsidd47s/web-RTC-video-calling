const config = {
    iceServers: [
        {
            urls: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"]
        }
    ]
};
  
//const signaler = new SignalingChannel();
const pc = new RTCPeerConnection(config);

const constraints = { audio: false, video: true };
let selfVideo = document.getElementById("user1");
let remoteVideo = document.getElementById("user1");

async function start() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia(constraints);

    for (const track of stream.getTracks()) {
      pc.addTrack(track, stream);
    }
    selfVideo.srcObject = stream;
  } catch (err) {
    console.error(err);
  }
}

start();

pc.ontrack = ({ track, streams }) => {
    track.onunmute = () => {
      if (remoteVideo.srcObject) {
        return;
      }
      remoteVideo.srcObject = streams[0];
    };
};

let makingOffer = false;

pc.onnegotiationneeded = async () => {
  try {
    makingOffer = true;
    await pc.setLocalDescription();
    console.log("description :", pc.localDescription )
    //sending description to the remote user
  } catch (err) {
    console.error(err);
  } finally {
    makingOffer = false;
  }
};

pc.onicecandidate = ({ candidate }) => {
  console.log("Candidate :", candidate)
  //agian sending the candidate from hear
};

//SOCKET.IO FOR SIGNLING 
const messages = document.getElementById('messages');
const socket = io("http://localhost:8080");

socket.on("chat message", (msg)=>{
    console.log("hello world")
})

//This is just a testing code for socketio from now onwards
const form = document.getElementById("messageForm")
const input = document.getElementById("messageInput")

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    console.log("form submitted with value :", input.value)
    if(input.value) {
        socket.emit("chat message", input.value);
    }
})

