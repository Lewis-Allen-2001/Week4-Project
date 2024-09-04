//getting the div id
const messageboardContainer = document.getElementById("messageboard");

//fetching stuff from the server (the server fetches data from the db)
async function getmessageboard() {
  const response = await fetch("http://localhost:5432/messageboard");
  const data = await response.json();
  console.log(data);

  messageboardContainer.innerHTML = "";

  //puts what we requested on the page
  data.forEach(function (messageboard) {
    const p = document.createElement("p");
    p.textContent = `${messageboard.username}: ${messageboard.message}`;
    messageboardContainer.appendChild(p);
  });
}
getmessageboard();

//ADDING NEW MESSAGES
const form = document.getElementById("submiting-messages");

async function handlePostMessages(event) {
  event.preventDefault();

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  console.log(data);

  await fetch("http://localhost:5432/messageboard", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  form.reset();
  getmessageboard();
}

form.addEventListener("submit", handlePostMessages);
