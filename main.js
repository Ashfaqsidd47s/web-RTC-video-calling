let APP_ID = "6069ffca06f04328af1f28d07fd64f9b"

let token = null;
let uid = String(Math.floor(Math.random()* 10000))

let client;
let channel;

let localStream;
let remoteStream;
let peerConnection;

const servers = {
    iceServers: [
        {
            urls: ["stun:stun1.1.google.com:19302", "stun:stun2.1.google.com:19302"]
        }
    ]
}


let init = async () => {    
    //asking the camara permition
    localStream = await navigator.mediaDevices.getUserMedia({video: true, audio: false});
    document.getElementById("user1").srcObject = localStream;       //setting the system video into the video tag

    createOffer()
}

let handelUserJoined = async (memberId) =>{
    console.log("A new user joined the channel...")
}

//create offer 
let createOffer = async () =>{
    peerConnection = new RTCPeerConnection(servers)

    remoteStream = new MediaStream()
    document.getElementById("user2").srcObject = remoteStream


    localStream.getTracks().forEach((track) => {
        peerConnection.addTrack(track, localStream)
    });

    peerConnection.ontrack = (event) => {
        event.streams[0].getTracks().forEach((track)=>{
            remoteStream.addTrack()
        })
    }

    peerConnection.onicecandidate = async (event) => {
        if(event.candidate){
            console.log("New Ice Candidate :", event.candidate)
        }
    }

    let offer = await peerConnection.createOffer()
    await peerConnection.setLocalDescription(offer)

    console.log("offer :", offer)
}

init();

//This is just a testing code for socketio from now onwards
const form = document.getElementById("messageForm")
const input = document.getElementById("messageInput")

form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(input.value) {
        socket.emit("chat message", input.value);
    }
})

