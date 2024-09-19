(function () {
    emailjs.init("cN1uhPyyRPs2_dtSf");
  })();
  
  function SendMail() {
    event.preventDefault();
    const params = {
      from_name:
        document.getElementById("firstName").value +
        " " +
        document.getElementById("lastName").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };
  
    document.getElementById("firstName").value = "";
    document.getElementById("lastName").value = "";
    document.getElementById("email").value = "";
    document.getElementById("message").value = "";
  
    emailjs.send("service_cc4c8i8", "template_qxe4dgr", params).then(
      function (res) {
        alert("✔ You have successfully sent a message. ✔");
      },
      function (error) {
        alert("❌ Something went wrong. Try again later. ❌");
      }
    );
  }

  let sections = document.querySelectorAll('.section');
  let navLinks = document.querySelectorAll('.nav_link');

  let currentSection = 'home';

  window.addEventListener('scroll', () => {
    sections.forEach(sec => {
      if (window.scrollY >= (sec.offsetTop - sec.clientHeight / 5)) {
        currentSection = sec.id;
      }

      navLinks.forEach(navLink => {
        if (navLink.href.includes(currentSection)) {
          document.querySelector('.active').classList.remove('active');
          navLink.classList.add('active');
        }
      });
    })
  });

  // event handlers

  let items = document.querySelectorAll('.slider .slide');
  let next = document.querySelector('.next');
  let prev = document.querySelector('.prev');

  let active = 3;
  function loadShow() {
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = `none`;
    items[active].style.opacity = 1;
    for(let i = active + 1; i < items.length; i++) {
      stt++;
      items[i].style.transform = `translateX(${100*stt}px) scale(${1 - 0.2*stt}) perspective(26px) rotateY(-1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = 'blur(1px)';
      items[i].style.opacity = stt > 2 ? 0 : 0.8;
    }
    stt = 0;
    for(let i = active - 1; i >= 0; i--) {
      stt++;
      items[i].style.transform = `translateX(${-100*stt}px) scale(${1 - 0.2*stt}) perspective(26px) rotateY(-1deg)`;
      items[i].style.zIndex = -stt;
      items[i].style.filter = 'blur(1px)';
      items[i].style.opacity = stt > 2 ? 0 : 0.8;
    }
  }
  loadShow();

  next.onclick = function() {
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
  }

  prev.onclick = function() {
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
  }

  // touch events - slide

  let slider = document.querySelector('.slider')

  let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0;

  items.forEach((item, index) => {
    const slideImages = item.querySelectorAll('img');

    slideImages.forEach((slideImage) => {
      slideImage.addEventListener('dragstart', (e) => e.preventDefault())
    })
    
          // Touch events
    item.addEventListener('touchstart', touchStart)
    item.addEventListener('touchend', touchEnd)
    item.addEventListener('touchmove', touchMove)

    // Mouse events
    // item.addEventListener('mousedown', touchStart)
    // item.addEventListener('mouseup', touchEnd)
    // item.addEventListener('mouseleave', touchEnd)
    // item.addEventListener('mouseout', touchEnd)
    // item.addEventListener('mousemove', touchMove)
  })

  // Disable context menu

  // window.oncontextmenu = function(event) {
  //   event.preventDefault();
  //   event.stopPropagation();
  //   return false;
  // }


  function touchStart(event) {
      startPos = getPositionX(event);
      isDragging = true;

      event.target.classList.add('active');
  }

  function touchEnd(event) {
      isDragging = false;

      const movedBy = currentTranslate - prevTranslate;
      
      console.log(movedBy);

      if (event.target.classList.contains('active')){
        if(movedBy < -20) {
          active = active + 1 < items.length ? active + 1 : active;
          loadShow();
        }
  
        if(movedBy > 20) {
          active = active - 1 >= 0 ? active - 1 : active;
          loadShow();
        }
      }

  }

  function touchMove(event) {
      if(isDragging){
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPos;
      }
    }

function getPositionX(event) {
  return event.type.includes('mouse')
    ? event.pageX
    : event.touches[0].clientX;
}

let checkElement = document.querySelector('.header--menu-btn');
let anchorElements = document.querySelectorAll('.nav_link');

anchorElements.forEach((el) => {
  el.addEventListener('click', uncheck)
})

function uncheck() {
  checkElement.checked = false;
}


//   let slider = document.querySelector('.slider')
//   let slides = Array.from(document.querySelectorAll('.slider .slide'));

//   console.log(slides);

//   let isDragging = false,
//   startPos = 0,
//   currentTranslate = 0,
//   prevTranslate = 0,
//   animationID = 0,
//   currentIndex = 3;

//   slides.forEach((slide, index) => {
//     const slideImage = slide.querySelector('img');
//     slideImage.addEventListener('dragstart', (e) => e.preventDefault())

//     // Touch events
//     slide.addEventListener('touchstart', touchStart(index))
//     slide.addEventListener('touchend', touchEnd)
//     slide.addEventListener('touchmove', touchMove)


//     // Mouse events
//     slide.addEventListener('mousedown', touchStart(index))
//     slide.addEventListener('mouseup', touchEnd)
//     slide.addEventListener('mouseleave', touchEnd)
//     slide.addEventListener('mousemove', touchMove)


//   })

//   // Disable context menu

//   // window.oncontextmenu = function(event) {
//   //   event.preventDefault();
//   //   event.stopPropagation();
//   //   return false;
//   // }


//   function touchStart(index) {
//     return function(event) {
//       currentIndex = index;
//       startPos = getPositionX(event);
//       isDragging = true;

//       animationID = requestAnimationFrame(animation);

//       slider.classList.add('grabbing');
//     }
//   }

//   function touchEnd() {
//       isDragging = false;
//       cancelAnimationFrame(animationID);

//       const movedBy = currentTranslate - prevTranslate;

//       if(movedBy < -100 && currentIndex < slides.length-1) {
//         currentIndex += 1;
//       }

//       if(movedBy > 100 && currentIndex > 0) {
//         currentIndex -= 1;
//       }

//       // setPositionByIndex();

//       slider.classList.remove('grabbing');

//   }

//   function touchMove(event) {
//       if(isDragging){
//         const currentPosition = getPositionX(event);
//         currentTranslate = prevTranslate + currentPosition - startPos;
//       }
//     }

// function getPositionX(event) {
//   return event.type.includes('mouse')
//     ? event.pageX
//     : event.touches[0].clientX;
// }

// function animation() {
//   setSliderPosition();
//   if(isDragging) requestAnimationFrame(animation)
// }

// function setSliderPosition() {
//   slider.style.transform = `translateX(${currentTranslate}px)`;
// }

// function setPositionByIndex(){
//   currentTranslate = currentIndex * -window.innerWidth;
//   prevTranslate = currentTranslate;
//   setSliderPosition()
// }