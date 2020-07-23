class Projects {
    constructor(image, apicode, uicode, demo, status, name, description) {
      this.image = image,
      this.apicode = apicode,
      this.uicode = uicode,
      this.demo = demo,
      this.status = status,
      this.name = name,
      this.description = description
    }
  }

  var dataproject = [
    new Projects ('./assets/image/cuaca.png', null, 'https://github.com/muhammadirzza/cuaca_ala-ala', 'https://cuaca-alala.web.app/', null, 'Weather App', ''),
    new Projects ('./assets/image/little-bogor.png', null, 'https://github.com/muhammadirzza/little_bogor', 'https://little-bogor.herokuapp.com/', null, 'Little Bogor', ''),
    new Projects ('./assets/image/eid-al-fitr.png', null, 'https://github.com/muhammadirzza/idul_fitri', 'https://happy-eid-alfitr.herokuapp.com/', null, 'Eid Al Fitr', ''),
    new Projects ("./assets/image/qur'an.png", null, 'https://github.com/muhammadirzza/quran', null, null, 'Quran', ''),
    new Projects ("./assets/image/e-commerce.png", null, 'https://github.com/muhammadirzza/frontend', null, null, 'E-Commerce Json-Server', ''),
    new Projects ('./assets/image/tokobuku.png', null, 'https://github.com/muhammadirzza/quran', '', null, 'E-Commerce Restful API', '')
  ]
    
  class Skills{
      constructor(program,list){
          this.program=program,
          this.list=list
      }
  }

  var data=[
      new Skills('Frontend',['Javascript','Html','CSS','React Js','Redux','Axios']),
      new Skills('Backend',['Node Js','Express','My SQL','Mongodb','Nodemailer','JWT']),
      new Skills('Mobile',['React Native','Redux', 'Context']),
      new Skills('Tools',['VS Code','GitHub','Scrum'])
  ]

  const printprojects = () => {
    var output = ''
    dataproject.forEach((val) => {
      if (val.image) {
        output += `<div class="card">
                    <img src=${val.image} alt=${val.name}" />
                    <div class="info">
                      <h2> ${val.name} </h2>
                      ${
                        val.demo ?
                        `<a href=${val.demo} target="blank">
                          <button><span><i class="fas fa-cog"></i></span> Demo </button>
                        </a>`
                        :
                        ''
                      }
                      ${
                        val.uicode ?
                        `<a href=${val.uicode} target="blank">
                          <button><span><i class="fab fa-github"></i></span> UI Code </button>
                        </a>`
                        :
                        ''
                      }
                    </div>  
                  </div>`          
      }
    })
    document.getElementById('projectsample').innerHTML=output
  }
  printprojects()

  const printskills = () => {
    var output = ''
    var inputname = ''
    var inputskill = ''
    console.log(data.length)
    for (let i = 0; i < data.length; i++) {
      for (let j = 0; j < data[i].list.length; j++) {
        // const element = array[j];
        inputskill +=`<ul>
                        <li>${data[i].list[j]}</li>
                      </ul>`           
      }
      inputname +=`<div class="frontend">
                      <h3>${data[i].program}</h3>
                      
                          ${inputskill}
                      
                    </div>`
      output += inputname
      inputskill = ''
      inputname = ''           
      // const element = array[i];
    }
    document.getElementById('skill').innerHTML = output
  }
  printskills()

  var checkbox = document.querySelector('input[name=theme]');
  var checkbur = document.querySelector('input[name=hamburger]');

  checkbur.addEventListener('click', function() {
      document.getElementById('navtoggle').classList.toggle('slide')
  })

  checkbox.addEventListener('change', function() {
      if(this.checked) {
          trans()
          document.documentElement.setAttribute('data-theme', 'dark')
      } else {
          trans()
          document.documentElement.setAttribute('data-theme', 'light')
      }
  })

  let trans = () => {
      document.documentElement.classList.add('transition');
      window.setTimeout(() => {
          document.documentElement.classList.remove('transition')
      }, 1000)
  }

  const Toast = {
    init() {
      this.hideTimeout = null;

      this.el = document.createElement("div");
      this.el.className = "toast";
      document.body.appendChild(this.el);
    },

    show(message, state) {
      clearTimeout(this.hideTimeout);

      this.el.textContent = message;
      this.el.className = "toast toast--visible";

      if (state) {
        this.el.classList.add(`toast--${state}`);
      }

      this.hideTimeout = setTimeout(() => {
        this.el.classList.remove("toast--visible");
      }, 3000);
    }
  };

  document.addEventListener("DOMContentLoaded", () => Toast.init());

  const sendData = () => {
    let name = document.getElementById('fullname').value
    let email = document.getElementById('email').value
    let subject = document.getElementById('subject').value
    let message = document.getElementById('message').value
    if (!name || !email || !subject || !message) {
      Toast.show('Please Complete the Form Below', 'error')
    } else {
      let data = {
        name, email, subject, message
      }

      let valemail = ValidateEmail(data.email)
      
      if (valemail) {
        postData('http://localhost:5000/email/postemails', { data })
        .then(data => {
          Toast.show('Thank You! Your Message Has Been Sent', 'success')
          console.log(data); // JSON data parsed by `data.json()` call
          resetForm()
        })
      } else {
        Toast.show('You have entered an invalid email address!', 'error')        
      }      
    }
  }

  async function postData(url = '', data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, *cors, same-origin
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: 'follow', // manual, *follow, error
      referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }

  const resetForm = () => {
    document.getElementById('email-wrapper').classList.remove('errorclass');
    document.getElementById('email-placeholder').classList.remove('errorclass');
    document.getElementById('fullname').value = ""
    document.getElementById('email').value = ""
    document.getElementById('subject').value = ""
    document.getElementById('message').value = ""
  }

  function ValidateEmail(inputText){
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if(inputText.match(mailformat)) {
        document.getElementById('email-wrapper').classList.remove('errorclass');
        document.getElementById('email-placeholder').classList.remove('errorclass');

        // document.form1.text1.focus();
        return true;
        // alert("You have entered a valid email address!");
    }
    else {
        // alert("You have entered an invalid email address!");
        document.getElementById('email-wrapper').classList.add('errorclass');
        document.getElementById('email-placeholder').classList.add('errorclass');
        return false;
    }
  }